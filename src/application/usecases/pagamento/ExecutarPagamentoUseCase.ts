import { Pagamento } from "../../../domain/entities/Pagamento";
import { StatusPagamento } from "../../../shared/enums/StatusPagamento";
import { IIntegradorPagamentoGateway } from "../../interfaces/pagamento/IIntegradorPagamento";
import { StatusPedido } from "../../../shared/enums/StatusPedido";
import { IPagamento } from "../../interfaces/pagamento/IPagamento";
import { IPagamentoGateway } from "../../interfaces/pagamento/IPagamentoGateway";
import { PedidoGateway } from "../../../infra/database/gateways/PedidoGateway";

export class ExecutarPagamentoUseCase {
    private pagamentoGateway: IPagamentoGateway;

    constructor(pagamentoGateway: IPagamentoGateway) {
        this.pagamentoGateway = pagamentoGateway;
    }

    async iniciar(pedido: number, integradorPagamentos: IIntegradorPagamentoGateway): Promise<Pagamento> {
        let pagamento = await this.pagamentoGateway.iniciarPagamento(pedido);
        if (!pagamento) {
            throw new Error('Pagamento não foi criado');
        }
        const pedidoGateway = new PedidoGateway();
        const buscaPedido = await pedidoGateway.buscarPedido(pedido);
        

        const resposta = await integradorPagamentos.gerarQRCode(buscaPedido, "Pedido Lanchonete");
        console.log(resposta);
        if (resposta.identificador_pedido != "") {
            pagamento.identificadorPedido = resposta.identificador_pedido;
            pagamento.qrCode = resposta.qrcode;
            pagamento = await this.pagamentoGateway.atualizarPagamento(pagamento);
            console.log('Pagamento atualizado com o qr-Code');
        }
        else {
            pagamento = await this.cancelar(pagamento.pedido);
        }

        return pagamento;
    }

    async pago(pedido: number): Promise<Pagamento> {
        const pagamento = await this.pagamentoGateway.buscarPagamento(pedido);
        if (!pagamento) {
            throw new Error('Pagamento não encontrado');
        }
        pagamento.status = StatusPagamento.PAGO;
        await this.pagamentoGateway.atualizarPagamento(pagamento);
        const mudarStatusPedido = new PedidoGateway();
        mudarStatusPedido.atualizaStatusPedido(pedido, StatusPedido.ENVIADO_PARA_A_COZINHA);

        return pagamento;
    }

    async cancelar(pedido: number): Promise<Pagamento> {
        const pagamento = await this.pagamentoGateway.buscarPagamento(pedido);
        if (!pagamento) {
            throw new Error('Pagamento não encontrado');
        }

        pagamento.status = StatusPagamento.CANCELADO;
        await this.pagamentoGateway.atualizarPagamento(pagamento);
        const mudarStatusPedido = new PedidoGateway();
        mudarStatusPedido.atualizaStatusPedido(pedido,StatusPedido.CANCELADO);

        return pagamento;
    }

    async consultaStatus(nro_pedido: number): Promise<IPagamento> {
        const pagamento = await this.pagamentoGateway.buscarPagamento(nro_pedido);
        return pagamento;
    }

    async consultaPedidoIntegrador(id: string): Promise<Pagamento> {
        const pagamento = await this.pagamentoGateway.buscarPagamentoPeloIntegrador(id);
        return pagamento;
    }
}