import { Body, Get, Path, Post, Route, Tags } from "tsoa";
import { ExecutarPagamentoUseCase } from "../../../application/usecases/pagamento/ExecutarPagamentoUseCase";
import { IIntegradorPagamentoGateway } from "../../../application/interfaces/pagamento/IIntegradorPagamento";

export interface PagamentoRequest {
    pedido: number;
}

interface PagamentoResponse {
    id: number;
    status: string;
    qrCode: string;
}

interface WebhookResponse {
    ok: boolean;
}

@Route("pagamento")
@Tags("Pagamento")
export default class PagamentoController {
    private pagamentoUseCase: ExecutarPagamentoUseCase;
    private integradorPagamentos: IIntegradorPagamentoGateway;

    constructor(pagamentoUseCase: ExecutarPagamentoUseCase, integradorPagamentos: IIntegradorPagamentoGateway) {
        this.pagamentoUseCase = pagamentoUseCase;
        this.integradorPagamentos = integradorPagamentos;
    }
    /**
     * Iniciar processo de pagamento
     * @param body 
     */
    @Post("/iniciar")
    public async iniciarPagamento(@Body() body: PagamentoRequest): Promise<PagamentoResponse> {
        const pagamento = await this.pagamentoUseCase.iniciar(body.pedido, this.integradorPagamentos);
        return {
            id: pagamento.id,
            status: pagamento.status,
            qrCode: pagamento.qrCode
        }
    }
    /**
     * Confirmar processo de pagamento
     * @deprecated (OBSOLETO) FASE 1 TECH-CHALLENGE
     */
    @Post("/confirmar")
    public async confirmarPagamento(@Body() body: PagamentoRequest): Promise<PagamentoResponse> {
        const pagamento = await this.pagamentoUseCase.pago(body.pedido);
        return {
            id: pagamento.id,
            status: pagamento.status,
            qrCode: pagamento.qrCode
        }
    }
    /**
     * Cancelar processo de pagamento
     * @deprecated (OBSOLETO) FASE 1 TECH-CHALLENGE
     */
    @Post("/cancelar")
    public async cancelarPagamento(@Body() body: PagamentoRequest): Promise<PagamentoResponse> {
        const pagamento = await this.pagamentoUseCase.cancelar(body.pedido);
        return {
            id: pagamento.id,
            status: pagamento.status,
            qrCode: pagamento.qrCode
        }
    }
    /**
     * Buscar o status de pagamento de um pedido
     */
    @Get("/status/:pedido")
    public async buscarStatusPedido(@Path() pedido: number): Promise<PagamentoResponse> {
        const pagamento = await this.pagamentoUseCase.consultaStatus(pedido);
        return {
            id: pagamento.id,
            status: pagamento.status,
            qrCode: pagamento.qrCode
        }

    }
    /**
     * Receber confirmação de pagamento do Integrador
     */
    @Post("/webhook")
    public async receberStatusPagamentoIntegrador(@Body() payload: string): Promise<WebhookResponse> {
        try {
            const respostaIntegrador = await this.integradorPagamentos.tratarRetorno(payload);
            if ((respostaIntegrador) && (respostaIntegrador.status == "closed")) {
                const pagto = await this.pagamentoUseCase.consultaPedidoIntegrador(respostaIntegrador.id_pagamento);
                if (pagto) {
                    if (respostaIntegrador.pago) {
                        this.pagamentoUseCase.pago(pagto.pedido);
                    }
                    else {
                        this.pagamentoUseCase.cancelar(pagto.pedido);
                    }
                }
            }
            return {
                ok: true
            }
        }
        catch {
            throw new Error('Erro no tratamento do payload de retorno do integrador');
        }
    }
}