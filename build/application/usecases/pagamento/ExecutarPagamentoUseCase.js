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
var data_source_1 = require("../../../infra/database/data-source");
var Pagamento_1 = require("../../../infra/database/repositories/Pagamento");
var Pagamento_2 = require("../../../domain/entities/Pagamento");
var StatusPagamento_1 = require("../../../shared/enums/StatusPagamento");
var Preco_1 = require("../../../shared/valueobjects/Preco");
var CadastrarPedidoUseCase_1 = require("../pedido/CadastrarPedidoUseCase");
var ListarPedidoUseCase_1 = require("../pedido/ListarPedidoUseCase");
var StatusPedido_1 = require("../../../shared/enums/StatusPedido");
var Pedido_1 = require("../../../infra/database/repositories/Pedido");
var ExecutarPagamentoUseCase = /** @class */ (function () {
    function ExecutarPagamentoUseCase() {
    }
    ExecutarPagamentoUseCase.prototype.busca_pedido = function (pedido) {
        return __awaiter(this, void 0, void 0, function () {
            var listarPedidos, r_pedido, pedidos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("busca_pedido(", pedido, ")");
                        listarPedidos = new ListarPedidoUseCase_1.ListarPedidosUseCase();
                        return [4 /*yield*/, listarPedidos.buscaPorID(pedido)];
                    case 1:
                        r_pedido = _a.sent();
                        if (r_pedido) {
                            pedidos = r_pedido;
                            return [2 /*return*/, pedidos[0]];
                        }
                        else {
                            throw new Error('Pedido inválido');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ExecutarPagamentoUseCase.prototype.converterRepository = function (pagamentoRepository) {
        var pagamento = new Pagamento_2.Pagamento(pagamentoRepository.id, pagamentoRepository.pedido.id, new Preco_1.Preco(pagamentoRepository.valor));
        pagamento.status = pagamentoRepository.status;
        pagamento.identificadorPedido = pagamentoRepository.identificador_pedido;
        pagamento.qrCode = pagamentoRepository.qrcode;
        console.log(pagamento);
        return pagamento;
    };
    ExecutarPagamentoUseCase.prototype.iniciar = function (pedido, integradorPagamentos) {
        return __awaiter(this, void 0, void 0, function () {
            var repPagamento, rep, buscaPedido, pagamento, mudarStatusPedido, resposta;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repPagamento = data_source_1.AppDataSource.getRepository(Pagamento_1.PagamentoRepository);
                        rep = new Pagamento_1.PagamentoRepository();
                        return [4 /*yield*/, this.busca_pedido(pedido)];
                    case 1:
                        buscaPedido = _a.sent();
                        if (buscaPedido.status > StatusPedido_1.StatusPedido.NOVO) {
                            throw new Error('Pedido já possui status avançado');
                        }
                        console.log("buscaPedido => ", buscaPedido.id);
                        rep.pedido = new Pedido_1.PedidoRepository();
                        rep.pedido.id = buscaPedido.id;
                        rep.status = StatusPagamento_1.StatusPagamento.AGUARDANDO_RESPOSTA;
                        rep.valor = buscaPedido.valorTotal.valor;
                        rep.identificador_pedido = "";
                        rep.qrcode = "";
                        console.log('Pagamento a cadastrar');
                        return [4 /*yield*/, repPagamento.save(rep)];
                    case 2:
                        rep = _a.sent();
                        console.log('Pagamento cadastrado');
                        pagamento = new Pagamento_2.Pagamento(rep.id, pedido, new Preco_1.Preco(rep.valor));
                        mudarStatusPedido = new CadastrarPedidoUseCase_1.CadastrarPedidoUseCase();
                        mudarStatusPedido.atualizaPedido(pedido, "ENVIAR_PARA_PAGAMENTO");
                        console.log('Pedido atualizado');
                        return [4 /*yield*/, integradorPagamentos.gerarQRCode(buscaPedido, "Pedido Lanchonete")];
                    case 3:
                        resposta = _a.sent();
                        if (!(resposta.identificador_pedido != "")) return [3 /*break*/, 5];
                        rep.identificador_pedido = resposta.identificador_pedido;
                        rep.qrcode = resposta.qrcode;
                        return [4 /*yield*/, repPagamento.save(rep)];
                    case 4:
                        rep = _a.sent();
                        console.log('Pagamento atualizado com o qr-Code');
                        return [3 /*break*/, 6];
                    case 5:
                        mudarStatusPedido.atualizaPedido(pedido, "CANCELADO");
                        _a.label = 6;
                    case 6: return [2 /*return*/, pagamento];
                }
            });
        });
    };
    ExecutarPagamentoUseCase.prototype.pago = function (pedido) {
        return __awaiter(this, void 0, void 0, function () {
            var repPagamento, rep, buscaPedido, _a, pagRepository, pagamento, mudarStatusPedido;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        repPagamento = data_source_1.AppDataSource.getRepository(Pagamento_1.PagamentoRepository);
                        rep = new Pagamento_1.PagamentoRepository();
                        buscaPedido = this.busca_pedido(pedido);
                        _a = rep.pedido;
                        return [4 /*yield*/, buscaPedido];
                    case 1:
                        _a.id = (_b.sent()).id;
                        return [4 /*yield*/, repPagamento.findOne({ where: { pedido: rep.pedido } })];
                    case 2:
                        pagRepository = _b.sent();
                        if (!pagRepository) return [3 /*break*/, 4];
                        rep.id = pagRepository.id;
                        rep.status = StatusPagamento_1.StatusPagamento.PAGO;
                        rep.valor = rep.pedido.total;
                        return [4 /*yield*/, repPagamento.save(rep)];
                    case 3:
                        rep = _b.sent();
                        return [3 /*break*/, 5];
                    case 4: throw new Error('Pagamento não encontrado');
                    case 5:
                        pagamento = new Pagamento_2.Pagamento(rep.id, pedido, new Preco_1.Preco(rep.valor));
                        pagamento.status = StatusPagamento_1.StatusPagamento.PAGO;
                        mudarStatusPedido = new CadastrarPedidoUseCase_1.CadastrarPedidoUseCase();
                        mudarStatusPedido.atualizaPedido(pedido, "ENVIADO_PARA_A_COZINHA");
                        return [2 /*return*/, pagamento];
                }
            });
        });
    };
    ExecutarPagamentoUseCase.prototype.cancelar = function (pedido) {
        return __awaiter(this, void 0, void 0, function () {
            var repPagamento, rep, buscaPedido, _a, pagRepository, pagamento, mudarStatusPedido;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        repPagamento = data_source_1.AppDataSource.getRepository(Pagamento_1.PagamentoRepository);
                        rep = new Pagamento_1.PagamentoRepository();
                        buscaPedido = this.busca_pedido(pedido);
                        _a = rep.pedido;
                        return [4 /*yield*/, buscaPedido];
                    case 1:
                        _a.id = (_b.sent()).id;
                        return [4 /*yield*/, repPagamento.findOne({ where: { pedido: rep.pedido } })];
                    case 2:
                        pagRepository = _b.sent();
                        if (!pagRepository) return [3 /*break*/, 4];
                        rep.id = pagRepository.id;
                        rep.status = StatusPagamento_1.StatusPagamento.CANCELADO;
                        rep.valor = rep.pedido.total;
                        return [4 /*yield*/, repPagamento.save(rep)];
                    case 3:
                        rep = _b.sent();
                        return [3 /*break*/, 5];
                    case 4: throw new Error('Pagamento não encontrado');
                    case 5:
                        pagamento = new Pagamento_2.Pagamento(rep.id, rep.pedido.id, new Preco_1.Preco(rep.valor));
                        pagamento.status = StatusPagamento_1.StatusPagamento.CANCELADO;
                        mudarStatusPedido = new CadastrarPedidoUseCase_1.CadastrarPedidoUseCase();
                        mudarStatusPedido.atualizaPedido(pedido, "cancelado");
                        return [2 /*return*/, pagamento];
                }
            });
        });
    };
    ExecutarPagamentoUseCase.prototype.consultaStatus = function (nro_pedido) {
        return __awaiter(this, void 0, void 0, function () {
            var repPagamento, pedido, rep, pagRepository;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repPagamento = data_source_1.AppDataSource.getRepository(Pagamento_1.PagamentoRepository);
                        return [4 /*yield*/, this.busca_pedido(nro_pedido)];
                    case 1:
                        pedido = _a.sent();
                        rep = new Pagamento_1.PagamentoRepository();
                        rep.pedido = new Pedido_1.PedidoRepository();
                        rep.pedido.id = pedido.id;
                        return [4 /*yield*/, repPagamento.findOne({ where: { pedido: rep.pedido }, relations: ["pedido"], order: { id: 'DESC' } })];
                    case 2:
                        pagRepository = _a.sent();
                        if (!pagRepository) {
                            throw new Error('Pagamento não encontrado');
                        }
                        console.log(pagRepository);
                        return [2 /*return*/, this.converterRepository(pagRepository)];
                }
            });
        });
    };
    ExecutarPagamentoUseCase.prototype.consultaPedidoIntegrador = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var repPagamento, pagRepository;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repPagamento = data_source_1.AppDataSource.getRepository(Pagamento_1.PagamentoRepository);
                        return [4 /*yield*/, repPagamento.findOne({ where: { identificador_pedido: id } })];
                    case 1:
                        pagRepository = _a.sent();
                        if (!pagRepository) {
                            throw new Error('Pedido integrador não encontrado');
                        }
                        return [2 /*return*/, this.converterRepository(pagRepository)];
                }
            });
        });
    };
    return ExecutarPagamentoUseCase;
}());
exports.ExecutarPagamentoUseCase = ExecutarPagamentoUseCase;
//# sourceMappingURL=ExecutarPagamentoUseCase.js.map