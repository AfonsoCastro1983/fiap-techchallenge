import { Body, Post, Route, Tags } from "tsoa";
import { ExecutarPagamentoUseCase } from "../../../core/usecases/pagamento/ExecutarPagamentoUseCase";

export interface PagamentoRequest {
    pedido: number;
}

interface PagamentoResponse {
    id: number;
    status: string;
}

@Route("pagamento")
@Tags("Pagamento")
export default class PagamentoController {
    private executarPagamentoUseCase: ExecutarPagamentoUseCase;

    constructor(executarPagamentoUseCase: ExecutarPagamentoUseCase) {
        this.executarPagamentoUseCase = executarPagamentoUseCase;
    }
    /**
     * Iniciar processo de pagamento
     * @param body 
     */
    @Post("/iniciar")
    public async iniciarPagamento(@Body() body: PagamentoRequest): Promise<PagamentoResponse> {
        const pagamento = await this.executarPagamentoUseCase.iniciar(body.pedido);
        return {
            id: pagamento.id,
            status: pagamento.status
        }
    }
    /**
     * Confirmar processo de pagamento
     */
    @Post("/confirmar")
    public async confirmarPagamento(@Body() body: PagamentoRequest): Promise<PagamentoResponse> {
        const pagamento = await this.executarPagamentoUseCase.pago(body.pedido);
        return {
            id: pagamento.id,
            status: pagamento.status
        }
    }
    @Post("/cancelar")
    public async cancelarPagamento(@Body() body: PagamentoRequest): Promise<PagamentoResponse> {
        const pagamento = await this.executarPagamentoUseCase.cancelar(body.pedido);
        return {
            id: pagamento.id,
            status: pagamento.status
        }
    }
}