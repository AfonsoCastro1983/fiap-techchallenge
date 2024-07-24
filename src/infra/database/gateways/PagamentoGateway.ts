import { Repository } from "typeorm";
import { IPagamentoGateway } from "../../../application/interfaces/pagamento/IPagamentoGateway";
import { AppDataSource } from "../data-source";
import { PagamentoRepository } from "../repositories/Pagamento";
import { PedidoRepository } from "../repositories/Pedido";
import { Pagamento } from "../../../domain/entities/Pagamento";
import { Preco } from "../../../shared/valueobjects/Preco";
import { PedidoGateway } from "./PedidoGateway";
import { StatusPedido } from "../../../shared/enums/StatusPedido";
import { StatusPagamento } from "../../../shared/enums/StatusPagamento";

export class PagamentoGateway implements IPagamentoGateway {
    private repPagamento: Repository<PagamentoRepository>;

    constructor() {
        this.repPagamento = AppDataSource.getRepository(PagamentoRepository);
    }

    private converterRepository(pagamentoRepository: PagamentoRepository): Pagamento {
        const pagamento = new Pagamento(pagamentoRepository.id, pagamentoRepository.pedido.id, new Preco(pagamentoRepository.valor));
        pagamento.status = pagamentoRepository.status;
        pagamento.identificadorPedido = pagamentoRepository.identificador_pedido;
        pagamento.qrCode = pagamentoRepository.qrcode;
        console.log(pagamento);
        return pagamento;
    }

    async buscarPagamento(pedido: number): Promise<Pagamento> {
        const gatewayPedido = new PedidoGateway();
        const pedidoRegistrado = await gatewayPedido.buscarPedido(pedido);
        
        let rep = new PagamentoRepository();
        rep.pedido = new PedidoRepository();
        rep.pedido.id = pedidoRegistrado.id;
        const pagRepository = await this.repPagamento.findOne({ where: { pedido: rep.pedido }, relations: ["pedido"], order: { id: 'DESC' } });
        if (!pagRepository) {
            throw new Error('Pagamento não encontrado');
        }
        return this.converterRepository(pagRepository);
    }

    async buscarPagamentoPeloIntegrador(codigo: string): Promise<Pagamento> {
        //Registro do integrador existe?
        const pagRepository = await this.repPagamento.findOne({ where: { identificador_pedido: codigo } });
        if (!pagRepository) {
            throw new Error('Pedido integrador não encontrado');
        }
        return this.converterRepository(pagRepository);
    }

    async atualizarPagamento(pagamento: Pagamento): Promise<Pagamento> {
        if (pagamento.id == 0) {
            throw new Error('Pagamento não gravado');
        }
        const pagRepository = await this.repPagamento.findOne({ where: { id: pagamento.id }, relations: ["pedido"], order: { id: 'DESC' } });
        if (!pagRepository) {
            throw new Error('Pagamento não encontrado');
        }
        pagRepository.identificador_pedido = pagamento.identificadorPedido;
        pagRepository.qrcode = pagamento.qrCode;
        pagRepository.status = pagamento.status;
        pagRepository.valor = pagamento.valor.valor;
        const new_rep = await this.repPagamento.save(pagRepository);

        return this.converterRepository(new_rep);
    }

    async iniciarPagamento(pedido: number): Promise<Pagamento> {
        const gatewayPedido = new PedidoGateway();
        const pedidoRegistrado = await gatewayPedido.buscarPedido(pedido);
        if (pedidoRegistrado.status != StatusPedido.NOVO) {
            throw new Error('Pedido já possui status avançado');
        }
        console.log("buscaPedido => ",pedidoRegistrado.id);
        let rep = new PagamentoRepository();
        rep.pedido = new PedidoRepository();
        rep.pedido.id = pedidoRegistrado.id;
        rep.status = StatusPagamento.AGUARDANDO_RESPOSTA;
        rep.valor = pedidoRegistrado.valorTotal.valor;
        rep.identificador_pedido = "";
        rep.qrcode = "";
        console.log('Pagamento a cadastrar');
        rep = await this.repPagamento.save(rep);
        console.log('Pagamento cadastrado');

        const pagamento = this.converterRepository(rep);
        const mudarStatusPedido = new PedidoGateway();
        mudarStatusPedido.atualizaStatusPedido(pedido, StatusPedido.ENVIAR_PARA_PAGAMENTO);
        console.log('Pedido atualizado');

        return pagamento;
    }
}