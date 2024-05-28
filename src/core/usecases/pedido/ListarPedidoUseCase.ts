import { AppDataSource } from "../../../infra/database/data-source";
import { PedidoItemRepository, PedidoRepository } from "../../../infra/database/repositories/Pedido";
import { StatusPedido } from "../../domain/entities/Pedido";

export class ListarPedidosUseCase {
    async buscaPorID(index: number): Promise<Array<PedidoRepository>> {
        const repPedido = AppDataSource.getRepository(PedidoRepository);
        const pedido = await repPedido.find({ where: { id: index }, relations: ['cliente', 'pedidoItems'], order: { data: 'ASC' } });
        return pedido;
    }
    async buscaPorStatus(status: string): Promise<Array<PedidoRepository>> {
        const repPedido = AppDataSource.getRepository(PedidoRepository);
        const statusValido = StatusPedido[status.toUpperCase() as keyof typeof StatusPedido];

        if (statusValido) {
            const pedido = await repPedido.find({ where: { status: statusValido }, relations: ['cliente', 'pedidoItems'], order: { data: 'ASC' } });
            return pedido;
        }
        else {
            throw new Error('Status inválido')
        }
    }
}