import { AppDataSource } from "../../../infra/database/data-source";
import { PedidoItemRepository, PedidoRepository } from "../../../infra/database/repositories/Pedido";
import { StatusPedido } from "../../../shared/enums/StatusPedido";
import { Pedido } from "../../../domain/entities/Pedido";
import { IPedido } from "../../interfaces/pedido/IPedido";
import { In } from "typeorm";
import { Item } from "../../../domain/entities/Item";
import { Preco } from "../../../shared/valueobjects/Preco";
import { ClienteGateway } from "../../../infra/database/gateways/ClienteGateway";

export class ListarPedidosUseCase {

    private async converteRepositoryEmPedido(repository: PedidoRepository): Promise<IPedido> {
        const pedido = new Pedido();
        if (repository.cliente) {
            pedido.cliente = new ClienteGateway().gerarClientePorRepositorio(repository.cliente);
        }
        pedido.data = repository.data;
        pedido.id = repository.id;
        pedido.atualizarStatus(repository.status);

        
        const repPedidoItem = await AppDataSource.getRepository(PedidoItemRepository).find({where: {pedido: repository}, relations: ["item"]});
        repPedidoItem.forEach(element => {
            console.log('converteRepositoryEmPedido loop');
            pedido.adicionarItem(new Item(element.item.id, element.item.nome, element.item.descricao, new Preco(element.preco), element.item.ingredientes,element.item.categoria),element.quantidade);
        });

        return pedido;
    }

    async buscaPorID(index: number): Promise<Array<IPedido>> {
        const repPedido = AppDataSource.getRepository(PedidoRepository);
        console.log("Id", index);
        const repPedidos = await repPedido.find({ where: { id: index }, relations: ["cliente","pedidoItems"], order: { data: 'ASC' } });
        return this.converteArrayPedidos(repPedidos);
    }

    async converteArrayPedidos(repPedidos: PedidoRepository[]): Promise<IPedido[]> {
        const pedidos: IPedido[] = [];
        for (const element of repPedidos) {
            const pedido = await this.converteRepositoryEmPedido(element);
            pedidos.push(pedido);
        }
        return pedidos;
    }

    async buscaPorStatus(status: string): Promise<Array<IPedido>> {
        const repPedido = AppDataSource.getRepository(PedidoRepository);
        const statusValido = StatusPedido[status.toUpperCase() as keyof typeof StatusPedido];

        if (statusValido) {
            const repPedidos = await repPedido.find({ where: { status: statusValido }, relations: ['cliente', 'pedidoItems'], order: { data: 'ASC' } });
            return this.converteArrayPedidos(repPedidos);
        }
        else {
            throw new Error('Status inválido')
        }
    }

    async buscaPorStatusModulo2(): Promise<Array<IPedido>> {
        const repPedido = AppDataSource.getRepository(PedidoRepository);
        const statusValido = [StatusPedido.PRONTO_PARA_ENTREGA, StatusPedido.EM_PREPARACAO, StatusPedido.ENVIADO_PARA_A_COZINHA];

        if (statusValido) {
            const repPedidos = await repPedido.find({ where: { status: In(statusValido) }, relations: ['cliente', 'pedidoItems'], order: { status: 'DESC', data: 'ASC' } });
            return this.converteArrayPedidos(repPedidos);
        }
        else {
            throw new Error('Status inválido')
        }
    }
}