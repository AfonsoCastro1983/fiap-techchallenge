import { StatusPedido } from "../../../shared/enums/StatusPedido";

export class CadastrarPedidoDto {
    id?: number;
    cliente?: number;
    itens?: {itemId: number, preco: number; quantidade: number}[];
    status: StatusPedido = StatusPedido.NOVO;
}