import { IPedido } from "../../application/interfaces/pedido/IPedido";
import { IQRCodePagamento } from "../../application/interfaces/pagamento/IQRCodePagamento";
import { IIntegradorPagamentoGateway } from "../../application/interfaces/pagamento/IIntegradorPagamento";
import axios from 'axios';
import { Categoria } from "../../shared/enums/Categoria";

export class MercadoPagoService implements IIntegradorPagamentoGateway {
    private _UserID = 1869980712;
    private _ExternalPOSID = 'LANCHONETECAIXA01';
    private _HeadersPadrao = {
        'Content-type': 'application/json',
        'Authorization': 'APP_USR-6715474558730028-062805-771a3ab307055374f172539d3eb50052-1869980712'
    }
    private _TempoPagamento = 2; //em minutos
    private _URLCallback = "URL CALLBACK";

    private geracaoPayload(pedido: IPedido, descricao: string): string {
        let expiracao: Date = new Date();
        expiracao.setMinutes(expiracao.getMinutes()+this._TempoPagamento);

        const payload = {
            cash_out: {amount : 0},
            description: descricao,
            external_reference: "Pedido:"+pedido.id.toString().padStart(10,'0'),
            expiration_date: expiracao.toLocaleString().replace(/Z$/,''),
            items: pedido.itens === undefined ? [] : pedido.itens.map( item => ({
                sku_number: item.item.id.toString(),
                category: item.item.categoria.toUpperCase() as keyof typeof Categoria,
                title: item.item.nome,
                description: item.item.descricao,
                unit_price: item.item.preco,
                quantity: item.quantidade,
                total_amount: item.total
            })),
            notification_url: this._URLCallback,
            title: "Lanchonete TechChallenge",
            total_amount: pedido.valorTotal.valor
        }
        return JSON.stringify(payload)
    }
    
    public async gerarQRCode(pedido: IPedido, descricao: string ) : Promise<IQRCodePagamento> {
        const payload: string = this.geracaoPayload(pedido, descricao)
        const url : string = 'https://api.mercadopago.com/instore/orders/qr/seller/collectors/${this._UserID}/pos/${this._ExternalPOSID}/qrs'
        console.log(payload)
        let resposta = {
            identificador_pedido: '',
            qrcode: ''
        }

        const headers = this._HeadersPadrao;

        axios.post(url,payload, {headers}).then( response => {
            resposta.identificador_pedido = response.data.in_store_order_id,
            resposta.qrcode = response.data.qr_data
        }).catch(error => {
            throw new Error('Erro ao gerar QR-Code:'+ error)
        })

        return resposta
    }
}