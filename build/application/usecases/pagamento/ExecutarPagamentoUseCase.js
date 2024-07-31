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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutarPagamentoUseCase = void 0;
var StatusPagamento_1 = require("../../../shared/enums/StatusPagamento");
var StatusPedido_1 = require("../../../shared/enums/StatusPedido");
var PedidoGateway_1 = require("../../../infra/database/gateways/PedidoGateway");
var ExecutarPagamentoUseCase = /** @class */ (function () {
    function ExecutarPagamentoUseCase(pagamentoGateway) {
        this.pagamentoGateway = pagamentoGateway;
    }
    ExecutarPagamentoUseCase.prototype.iniciar = function (pedido, integradorPagamentos) {
        return __awaiter(this, void 0, void 0, function () {
            var pagamento, pedidoGateway, buscaPedido, resposta;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('ExecutarPagamentoUseCase.iniciar()');
                        return [4 /*yield*/, this.pagamentoGateway.iniciarPagamento(pedido)];
                    case 1:
                        pagamento = _a.sent();
                        if (!pagamento) {
                            throw new Error('Pagamento não foi criado');
                        }
                        pedidoGateway = new PedidoGateway_1.PedidoGateway();
                        return [4 /*yield*/, pedidoGateway.buscarPedido(pedido)];
                    case 2:
                        buscaPedido = _a.sent();
                        if (!buscaPedido) {
                            throw new Error('Pedido não encontrado');
                        }
                        console.log('buscaPedido', buscaPedido);
                        return [4 /*yield*/, integradorPagamentos.gerarQRCode(buscaPedido, "Pedido Lanchonete")];
                    case 3:
                        resposta = _a.sent();
                        console.log(resposta);
                        if (!(resposta.identificador_pedido != "")) return [3 /*break*/, 5];
                        pagamento.identificadorPedido = resposta.identificador_pedido;
                        pagamento.qrCode = resposta.qrcode;
                        return [4 /*yield*/, this.pagamentoGateway.atualizarPagamento(pagamento)];
                    case 4:
                        pagamento = _a.sent();
                        console.log('Pagamento atualizado com o qr-Code');
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.cancelar(pagamento.pedido)];
                    case 6:
                        pagamento = _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/, pagamento];
                }
            });
        });
    };
    ExecutarPagamentoUseCase.prototype.pago = function (pedido) {
        return __awaiter(this, void 0, void 0, function () {
            var pagamento, mudarStatusPedido;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pagamentoGateway.buscarPagamento(pedido)];
                    case 1:
                        pagamento = _a.sent();
                        if (!pagamento) {
                            throw new Error('Pagamento não encontrado');
                        }
                        pagamento.status = StatusPagamento_1.StatusPagamento.PAGO;
                        return [4 /*yield*/, this.pagamentoGateway.atualizarPagamento(pagamento)];
                    case 2:
                        _a.sent();
                        mudarStatusPedido = new PedidoGateway_1.PedidoGateway();
                        mudarStatusPedido.atualizaStatusPedido(pedido, StatusPedido_1.StatusPedido.ENVIADO_PARA_A_COZINHA);
                        return [2 /*return*/, pagamento];
                }
            });
        });
    };
    ExecutarPagamentoUseCase.prototype.cancelar = function (pedido) {
        return __awaiter(this, void 0, void 0, function () {
            var pagamento, mudarStatusPedido;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('ExecutarPagamentoUseCase.cancelar()');
                        return [4 /*yield*/, this.pagamentoGateway.buscarPagamento(pedido)];
                    case 1:
                        pagamento = _a.sent();
                        if (!pagamento) {
                            throw new Error('Pagamento não encontrado');
                        }
                        pagamento.status = StatusPagamento_1.StatusPagamento.CANCELADO;
                        return [4 /*yield*/, this.pagamentoGateway.atualizarPagamento(pagamento)];
                    case 2:
                        _a.sent();
                        mudarStatusPedido = new PedidoGateway_1.PedidoGateway();
                        mudarStatusPedido.atualizaStatusPedido(pedido, StatusPedido_1.StatusPedido.CANCELADO);
                        return [2 /*return*/, pagamento];
                }
            });
        });
    };
    ExecutarPagamentoUseCase.prototype.consultaStatus = function (nro_pedido) {
        return __awaiter(this, void 0, void 0, function () {
            var pagamento;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pagamentoGateway.buscarPagamento(nro_pedido)];
                    case 1:
                        pagamento = _a.sent();
                        return [2 /*return*/, pagamento];
                }
            });
        });
    };
    ExecutarPagamentoUseCase.prototype.consultaPedidoIntegrador = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var pagamento;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pagamentoGateway.buscarPagamentoPeloIntegrador(id)];
                    case 1:
                        pagamento = _a.sent();
                        return [2 /*return*/, pagamento];
                }
            });
        });
    };
    return ExecutarPagamentoUseCase;
}());
exports.ExecutarPagamentoUseCase = ExecutarPagamentoUseCase;
//# sourceMappingURL=ExecutarPagamentoUseCase.js.map