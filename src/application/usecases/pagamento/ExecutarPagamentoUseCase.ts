import { AppDataSource } from "../../../infra/database/data-source";
import { PagamentoRepository } from "../../../infra/database/repositories/Pagamento";
import { Pagamento } from "../../../domain/entities/Pagamento";
import { StatusPagamento } from "../../../shared/enums/StatusPagamento";
import { Preco } from "../../../shared/valueobjects/Preco";
import { CadastrarPedidoUseCase } from "../pedido/CadastrarPedidoUseCase";
import { IIntegradorPagamentoGateway } from "../../interfaces/pagamento/IIntegradorPagamento";
import { IPedido } from "../../interfaces/pedido/IPedido";
import { ListarPedidosUseCase } from "../pedido/ListarPedidoUseCase";

export class ExecutarPagamentoUseCase {
    private async busca_pedido(pedido: number): Promise<IPedido> {
        const r_pedido = new ListarPedidosUseCase().buscaPorID(pedido);
        if (r_pedido) {
            const pedidos = await r_pedido
            return pedidos[0]
        }
        else {
            throw new Error('Pedido inválido')
        }
    }

    async iniciar(pedido: number, integradorPagamentos: IIntegradorPagamentoGateway): Promise<Pagamento> {
        const repPagamento = AppDataSource.getRepository(PagamentoRepository);
        let rep = new PagamentoRepository();
        const buscaPedido = this.busca_pedido(pedido);
        rep.pedido.id = (await buscaPedido).id;
        rep.status = StatusPagamento.AGUARDANDO_RESPOSTA;
        rep.valor = (await buscaPedido).valorTotal.valor;
        rep = await repPagamento.save(rep);

        const pagamento = new Pagamento(rep.id, new Preco(rep.valor));
        const mudarStatusPedido = new CadastrarPedidoUseCase();
        mudarStatusPedido.atualizaPedido(pedido,"ENVIAR_PARA_PAGAMENTO");

        const resposta = await integradorPagamentos.gerarQRCode((await buscaPedido), "Pedido Lanchonete");
        if (resposta.identificador_pedido != "") {
            rep.identificador_pedido = resposta.identificador_pedido;
            rep.qrcode = resposta.qrcode;
            repPagamento.save(rep);
        }
        else {
            mudarStatusPedido.atualizaPedido(pedido,"CANCELADO");
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

        const pagamento = new Pagamento(rep.id, new Preco(rep.valor));
        pagamento.status = StatusPagamento.PAGO;
        const mudarStatusPedido = new CadastrarPedidoUseCase();
        mudarStatusPedido.atualizaPedido(pedido,"ENVIADO_PARA_A_COZINHA");

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

        const pagamento = new Pagamento(rep.id, new Preco(rep.valor));
        pagamento.status = StatusPagamento.CANCELADO;
        const mudarStatusPedido = new CadastrarPedidoUseCase();
        mudarStatusPedido.atualizaPedido(pedido,"cancelado");

        return pagamento;
    }
}