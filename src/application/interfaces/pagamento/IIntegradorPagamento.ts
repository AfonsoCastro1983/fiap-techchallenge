import { IPedido } from "../pedido/IPedido"
import { IQRCodePagamento } from "./IQRCodePagamento"

export interface IIntegradorPagamentoGateway {
    gerarQRCode(pedido: IPedido, descricao: string ) : Promise<IQRCodePagamento>
}