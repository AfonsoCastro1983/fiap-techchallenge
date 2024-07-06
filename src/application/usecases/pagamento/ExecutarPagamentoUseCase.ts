import { AppDataSource } from "../../../infra/database/data-source";
import { PagamentoRepository } from "../../../infra/database/repositories/Pagamento";
import { Pagamento } from "../../../domain/entities/Pagamento";
import { StatusPagamento } from "../../../shared/enums/StatusPagamento";
import { Preco } from "../../../shared/valueobjects/Preco";
import { CadastrarPedidoUseCase } from "../pedido/CadastrarPedidoUseCase";
import { IIntegradorPagamentoGateway } from "../../interfaces/pagamento/IIntegradorPagamento";
import { IPedido } from "../../interfaces/pedido/IPedido";
import { ListarPedidosUseCase } from "../pedido/ListarPedidoUseCase";
import { StatusPedido } from "../../../shared/enums/StatusPedido";
import { PedidoRepository } from "../../../infra/database/repositories/Pedido";
import { IPagamento } from "../../interfaces/pagamento/IPagamento";

export class ExecutarPagamentoUseCase {
    private async busca_pedido(pedido: number): Promise<IPedido> {
        console.log("busca_pedido(",pedido,")");
        const listarPedidos = new ListarPedidosUseCase();
        const r_pedido = await listarPedidos.buscaPorID(pedido);
        if (r_pedido) {
            const pedidos = r_pedido
            return pedidos[0]
        }
        else {
            throw new Error('Pedido inválido')
        }
    }

    private converterRepository(pagamentoRepository: PagamentoRepository): Pagamento {
        const pagamento = new Pagamento(pagamentoRepository.id, pagamentoRepository.pedido.id, new Preco(pagamentoRepository.valor));
        pagamento.status = pagamentoRepository.status;
        pagamento.identificadorPedido = pagamentoRepository.identificador_pedido;
        pagamento.qrCode = pagamentoRepository.qrcode;
        console.log(pagamento);
        return pagamento;
    }

    async iniciar(pedido: number, integradorPagamentos: IIntegradorPagamentoGateway): Promise<Pagamento> {
        const repPagamento = AppDataSource.getRepository(PagamentoRepository);
        let rep = new PagamentoRepository();
        const buscaPedido = await this.busca_pedido(pedido);
        if (buscaPedido.status > StatusPedido.NOVO) {
            throw new Error('Pedido já possui status avançado');
        }
        console.log("buscaPedido => ",buscaPedido.id);
        rep.pedido = new PedidoRepository();
        rep.pedido.id = buscaPedido.id;
        rep.status = StatusPagamento.AGUARDANDO_RESPOSTA;
        rep.valor = buscaPedido.valorTotal.valor;
        rep.identificador_pedido = "";
        rep.qrcode = "";
        console.log('Pagamento a cadastrar');
        rep = await repPagamento.save(rep);
        console.log('Pagamento cadastrado');

        const pagamento = new Pagamento(rep.id, pedido, new Preco(rep.valor));
        const mudarStatusPedido = new CadastrarPedidoUseCase();
        mudarStatusPedido.atualizaPedido(pedido, "ENVIAR_PARA_PAGAMENTO");
        console.log('Pedido atualizado');

        const resposta = await integradorPagamentos.gerarQRCode(buscaPedido, "Pedido Lanchonete");
        console.log(resposta);
        if (resposta.identificador_pedido != "") {
            rep.identificador_pedido = resposta.identificador_pedido;
            rep.qrcode = resposta.qrcode;
            rep = await repPagamento.save(rep);
            console.log('Pagamento atualizado com o qr-Code');
            pagamento.identificadorPedido = resposta.identificador_pedido;
            pagamento.qrCode = resposta.qrcode;
        }
        else {
            mudarStatusPedido.atualizaPedido(pedido, "CANCELADO");
            pagamento.status = StatusPagamento.CANCELADO;
            this.cancelar(pagamento.pedido);
        }

        return pagamento;
    }

    async pago(pedido: number): Promise<Pagamento> {
        const repPagamento = AppDataSource.getRepository(PagamentoRepository);

        let rep = new PagamentoRepository();
        const buscaPedido = this.busca_pedido(pedido);
        rep.pedido.id = (await buscaPedido).id;

        const pagRepository = await repPagamento.findOne({ where: { pedido: rep.pedido } });
        if (pagRepository) {
            rep.id = pagRepository.id;
            rep.status = StatusPagamento.PAGO;
            rep.valor = rep.pedido.total;
            rep = await repPagamento.save(rep);
        }
        else {
            throw new Error('Pagamento não encontrado');
        }

        const pagamento = new Pagamento(rep.id, pedido, new Preco(rep.valor));
        pagamento.status = StatusPagamento.PAGO;
        const mudarStatusPedido = new CadastrarPedidoUseCase();
        mudarStatusPedido.atualizaPedido(pedido, "ENVIADO_PARA_A_COZINHA");

        return pagamento;
    }

    async cancelar(pedido: number): Promise<Pagamento> {
        const repPagamento = AppDataSource.getRepository(PagamentoRepository);

        let rep = new PagamentoRepository();
        const buscaPedido = this.busca_pedido(pedido);
        rep.pedido.id = (await buscaPedido).id;

        const pagRepository = await repPagamento.findOne({ where: { pedido: rep.pedido } });
        if (pagRepository) {
            rep.id = pagRepository.id;
            rep.status = StatusPagamento.CANCELADO;
            rep.valor = rep.pedido.total;
            rep = await repPagamento.save(rep);
        }
        else {
            throw new Error('Pagamento não encontrado');
        }

        const pagamento = new Pagamento(rep.id, rep.pedido.id, new Preco(rep.valor));
        pagamento.status = StatusPagamento.CANCELADO;
        const mudarStatusPedido = new CadastrarPedidoUseCase();
        mudarStatusPedido.atualizaPedido(pedido, "cancelado");

        return pagamento;
    }

    async consultaStatus(nro_pedido: number): Promise<IPagamento> {
        const repPagamento = AppDataSource.getRepository(PagamentoRepository);
        //Pedido existe?
        const pedido = await this.busca_pedido(nro_pedido);
        let rep = new PagamentoRepository();
        rep.pedido = new PedidoRepository();
        rep.pedido.id = pedido.id;
        const pagRepository = await repPagamento.findOne({ where: { pedido: rep.pedido }, relations: ["pedido"], order: { id: 'DESC' } });
        if (!pagRepository) {
            throw new Error('Pagamento não encontrado')
        }
        console.log(pagRepository);
        return this.converterRepository(pagRepository);
    }

    async consultaPedidoIntegrador(id: string): Promise<Pagamento> {
        const repPagamento = AppDataSource.getRepository(PagamentoRepository);
        //Registro do integrador existe?
        const pagRepository = await repPagamento.findOne({ where: { identificador_pedido: id } });
        if (!pagRepository) {
            throw new Error('Pedido integrador não encontrado');
        }
        return this.converterRepository(pagRepository);
    }
}