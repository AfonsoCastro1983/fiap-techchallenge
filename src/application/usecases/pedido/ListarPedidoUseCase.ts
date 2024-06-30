import { AppDataSource } from "../../../infra/database/data-source";
import { PedidoRepository } from "../../../infra/database/repositories/Pedido";
import { StatusPedido } from "../../../shared/enums/StatusPedido";
import { Pedido } from "../../../domain/entities/Pedido";
import { Cliente } from "../../../domain/entities/Cliente";
import { Email } from "../../../shared/valueobjects/Email";
import { CPF } from "../../../shared/valueobjects/CPF";
import { IPedido } from "../../interfaces/pedido/IPedido";
import { Item } from "../../../domain/entities/Item";
import { Preco } from "../../../shared/valueobjects/Preco";

export class ListarPedidosUseCase {

    private converteRepositoryEmPedido(repository: PedidoRepository): Pedido {
        const pedido = new Pedido();
        if (repository.cliente) {
            pedido.cliente = new Cliente(repository.cliente.id, repository.cliente.nome,new Email(repository.cliente.email),new CPF(repository.cliente.cpf))
        }
        pedido.data = repository.data;
        pedido.id = repository.id;
        pedido.atualizarStatus(repository.status);
        repository.pedidoItems.forEach(item => {
            pedido.adicionarItem(new Item(item.item.id,item.item.nome,item.item.descricao,new Preco(item.preco),item.item.ingredientes,item.item.categoria),item.quantidade);
        });
        return pedido;
    }

    async buscaPorID(index: number): Promise<Array<IPedido>> {
        const repPedido = AppDataSource.getRepository(PedidoRepository);
        const repPedidos = await repPedido.find({ where: { id: index }, relations: ['cliente', 'pedidoItems'], order: { data: 'ASC' } });
        return this.converteArrayPedidos(repPedidos);
    }

    private converteArrayPedidos(repPedidos: PedidoRepository[]) {
        const pedidos: IPedido[] = [];
        repPedidos.forEach(pedido => {
            pedidos.push(this.converteRepositoryEmPedido(pedido));
        });
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
}