import { IPedido } from "./IPedido";
import { StatusPedido } from "../../../shared/enums/StatusPedido";

export interface IPedidoGateway {
    criarPedido(pedido: IPedido): Promise<IPedido>;
    buscarPedido(pedido: number): Promise<IPedido>;
    atualizaStatusPedido(pedido: number, novo_status: StatusPedido): Promise<IPedido>;
}