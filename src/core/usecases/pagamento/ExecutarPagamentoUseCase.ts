import { AppDataSource } from "../../../infra/database/data-source";
import { PagamentoRepository } from "../../../infra/database/repositories/Pagamento";
import { PedidoRepository } from "../../../infra/database/repositories/Pedido";
import { Pagamento, StatusPagamento } from "../../domain/entities/Pagamento";
import { Preco } from "../../domain/valueobjects/Preco";
import { CadastrarPedidoUseCase } from "../pedido/CadastrarPedidoUseCase";

export class ExecutarPagamentoUseCase {
    private async busca_pedido(pedido: number): Promise<PedidoRepository> {
        const repPedido = await AppDataSource.getRepository(PedidoRepository).findOne({ where: {id: pedido}, relations: ['cliente','pedidoItems'] });
        if (repPedido) {
            const rep = new PedidoRepository();
            rep.id = pedido;
            rep.total = repPedido.total;
            return rep;
        }
        else {
            throw new Error('Pedido inválido');
        }
    }

    async iniciar(pedido: number): Promise<Pagamento> {
        const repPagamento = AppDataSource.getRepository(PagamentoRepository);
        let rep = new PagamentoRepository();
        const buscaPedido = this.busca_pedido(pedido);
        rep.pedido = new PedidoRepository();
        rep.pedido.id = (await buscaPedido).id;
        rep.status = StatusPagamento.AGUARDANDO_RESPOSTA;
        rep.valor = (await buscaPedido).total;
        rep = await repPagamento.save(rep);

        const pagamento = new Pagamento(rep.id, new Preco(rep.valor));
        const mudarStatusPedido = new CadastrarPedidoUseCase();
        mudarStatusPedido.atualizaPedido(pedido,"ENVIAR_PARA_PAGAMENTO");

        return pagamento;
    }

    async pago(pedido: number): Promise<Pagamento> {
        const repPagamento = AppDataSource.getRepository(PagamentoRepository);

        let rep = new PagamentoRepository();
        const buscaPedido = this.busca_pedido(pedido);
        rep.pedido = new PedidoRepository();
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
        rep.pedido = new PedidoRepository();
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