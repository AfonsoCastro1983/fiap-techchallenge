"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MercadoPagoService = void 0;
var axios_1 = __importDefault(require("axios"));
var MercadoPagoService = /** @class */ (function () {
    function MercadoPagoService(requisicao, path_webhook) {
        this._UserID = 1869980712;
        this._ExternalPOSID = 'LANCHONETECAIXA01';
        this._HeadersPadrao = {
            'Content-type': 'application/json',
            'Authorization': 'Bearer APP_USR-6715474558730028-062805-771a3ab307055374f172539d3eb50052-1869980712'
        };
        this._TempoPagamento = 2; //em minutos
        this._URLCallback = "";
        var protocolo = requisicao.headers['x-forwarded-proto'] || requisicao.protocol;
        var host = requisicao.headers['host'];
        this._URLCallback = protocolo + "://" + host + "/" + path_webhook;
        console.log(this._URLCallback);
    }
    MercadoPagoService.prototype.geracaoPayload = function (pedido, descricao) {
        var expiracao = new Date();
        expiracao.setMinutes(expiracao.getMinutes() + this._TempoPagamento);
        expiracao.setHours(expiracao.getHours() - 3);
        console.log('expiração:', expiracao);
        var payload = {
            cash_out: { amount: 0 },
            description: descricao,
            external_reference: "Pedido:" + pedido.id.toString().padStart(10, '0'),
            expiration_date: expiracao.toISOString().replace(/Z$/, '-03:00'),
            items: pedido.itens === undefined ? [] : pedido.itens.map(function (item) { return ({
                sku_number: item.item.id.toString(),
                category: item.item.categoria.toUpperCase(),
                title: item.item.nome,
                description: item.item.descricao,
                unit_price: Number(item.item.preco.valor),
                unit_measure: "UNIDADE",
                quantity: item.quantidade.valor,
                total_amount: item.total.valor
            }); }),
            notification_url: this._URLCallback,
            title: "Lanchonete TechChallenge",
            total_amount: pedido.valorTotal.valor
        };
        return JSON.stringify(payload);
    };
    MercadoPagoService.prototype.gerarQRCode = function (pedido, descricao) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, url, resposta, headers;
            return __generator(this, function (_a) {
                payload = this.geracaoPayload(pedido, descricao);
                url = 'https://api.mercadopago.com/instore/orders/qr/seller/collectors/' + this._UserID + '/pos/' + this._ExternalPOSID + '/qrs';
                resposta = {
                    identificador_pedido: '',
                    qrcode: ''
                };
                headers = this._HeadersPadrao;
                axios_1.default.post(url, payload, { headers: headers }).then(function (response) {
                    console.log('response:', response);
                    resposta.identificador_pedido = response.data.in_store_order_id;
                    resposta.qrcode = response.data.qr_data;
                }).catch(function (error) {
                    throw new Error('Erro ao gerar QR-Code:' + error);
                });
                console.log(resposta);
                return [2 /*return*/, resposta];
            });
        });
    };
    MercadoPagoService.prototype.tratarRetorno = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var transacao;
            return __generator(this, function (_a) {
                console.log(body);
                transacao = JSON.parse(body);
                return [2 /*return*/, {
                        id_pagamento: transacao.id,
                        status: transacao.status,
                        pago: transacao.order_status == "paid"
                    }];
            });
        });
    };
    return MercadoPagoService;
}());
exports.MercadoPagoService = MercadoPagoService;
//# sourceMappingURL=MercadoPagoService.js.map