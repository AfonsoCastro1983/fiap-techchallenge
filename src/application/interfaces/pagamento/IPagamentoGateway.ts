import { Pagamento } from "../../../domain/entities/Pagamento";

export interface IPagamentoGateway {
    iniciarPagamento(pedido: number): Promise<Pagamento>;
    atualizarPagamento(pagamento: Pagamento): Promise<Pagamento>;
    buscarPagamento(pedido: number): Promise<Pagamento>;
    buscarPagamentoPeloIntegrador(codigo: string): Promise<Pagamento>;
}