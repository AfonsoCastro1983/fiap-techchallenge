import { Preco } from "../../../shared/valueobjects/Preco";
import { IPedidoItem } from "./IPedidoItem";
import { ICliente } from "../cliente/ICliente";
import { StatusPedido } from "../../../shared/enums/StatusPedido";

export interface IPedido {
    id: number;
    data: Date;
    status: StatusPedido;
    cliente?: ICliente;
    valorTotal: Preco;
    itens: IPedidoItem[];
    atualizarStatus(novoStatus: StatusPedido): void;
}