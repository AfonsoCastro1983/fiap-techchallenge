"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
var tsoa_1 = require("tsoa");
var CadastrarPedidoUseCase_1 = require("../../../application/usecases/pedido/CadastrarPedidoUseCase");
var ListarPedidoUseCase_1 = require("../../../application/usecases/pedido/ListarPedidoUseCase");
var PedidoGateway_1 = require("../../database/gateways/PedidoGateway");
var PedidoController = /** @class */ (function () {
    function PedidoController(pedidoGateway) {
        this.cadastrarPedidoUseCase = new CadastrarPedidoUseCase_1.CadastrarPedidoUseCase(pedidoGateway);
    }
    PedidoController.prototype.formataResposta = function (pedidos) {
        if (!pedidos || pedidos.length === 0) {
            throw new Error("Pedido não encontrado");
        }
        var pedidosResponse = pedidos.map(function (pedido) { return ({
            id: pedido.id,
            data: pedido.data,
            status: pedido.status,
            cliente: pedido.cliente === undefined || pedido.cliente === null ? 0 : pedido.cliente.id,
            total: pedido.valorTotal.valor,
            pedidoItems: pedido.itens === undefined ? [] : pedido.itens.map(function (item) { return ({
                itemId: item.item.id,
                nome: item.item.nome,
                preco: item.item.preco.valor,
                quantidade: item.quantidade.valor
            }); })
        }); });
        return pedidosResponse;
    };
    /**
     * Busca um pedido específico
     * @param id identificador do pedido
     * @returns
     * Lista de pedidos encontrados
     */
    PedidoController.prototype.buscaPorId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var listaPedidos, pedidos, pedidosResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        listaPedidos = new ListarPedidoUseCase_1.ListarPedidosUseCase();
                        return [4 /*yield*/, listaPedidos.buscaPorID(id)];
                    case 1:
                        pedidos = _a.sent();
                        console.log('BuscaPorId', pedidos);
                        pedidosResponse = this.formataResposta(pedidos);
                        console.log('BuscaPorIdSaida', pedidosResponse);
                        return [2 /*return*/, { pedidos: pedidosResponse }];
                }
            });
        });
    };
    /**
     * Busca pedidos por um status específico
     * @param status status do pedido.
     * Opções de status para pesquisar:
     * - NOVO (Pedido que acabou de ser solicitado),
     * - ENVIAR_PARA_PAGAMENTO (Pedido que já foi conlcuído pelo cliente e o mesmo solicitou seu pagamento)
     * - CANCELADO (Pedido Cancelado, pelo cliente ou pelo sistema)
     * - ENVIADO_PARA_A_COZINHA (Pedido já pago, enviado para iniciar a preparação)
     * - EM_PREPARACAO (Pedido em preparação)
     * - PREPARADO (Pedido finalizado e disponível para embalagem)
     * - PRONTO_PARA_ENTREGA (Pedido embalado ou pronto para entrega no balcão)
     * - ENTREGUE (Pedido entregue pelo cliente)
     * @returns
     * Lista de pedidos encontrados
     */
    PedidoController.prototype.buscaPorStatus = function (status) {
        return __awaiter(this, void 0, void 0, function () {
            var listaPedidos, pedidos, pedidosResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        listaPedidos = new ListarPedidoUseCase_1.ListarPedidosUseCase();
                        return [4 /*yield*/, listaPedidos.buscaPorStatus(status)];
                    case 1:
                        pedidos = _a.sent();
                        pedidosResponse = this.formataResposta(pedidos);
                        return [2 /*return*/, { pedidos: pedidosResponse }];
                }
            });
        });
    };
    /**
     * Busca pedidos pelos status descritos no módulo 2 (Pronto (PRONTO_PARA_ENTREGA) > Em Preparação (EM_PREPARACAO) > Recebido (ENVIADO_PARA_A_COZINHA))
     * @returns
     * Lista de pedidos encontrados
     */
    PedidoController.prototype.buscaPorStatusModulo2 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var listaPedidos, pedidos, pedidosResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        listaPedidos = new ListarPedidoUseCase_1.ListarPedidosUseCase();
                        return [4 /*yield*/, listaPedidos.buscaPorStatusModulo2()];
                    case 1:
                        pedidos = _a.sent();
                        pedidosResponse = this.formataResposta(pedidos);
                        return [2 /*return*/, { pedidos: pedidosResponse }];
                }
            });
        });
    };
    /**
     * Cadastrar pedido
     */
    PedidoController.prototype.cadastrarPedido = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var dto, pedido, pedidoResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dto = {
                            id: body.id,
                            cliente: body.cliente,
                            itens: body.itens,
                            status: body.status,
                        };
                        return [4 /*yield*/, this.cadastrarPedidoUseCase.execute(dto)];
                    case 1:
                        pedido = _a.sent();
                        console.log(pedido);
                        pedidoResponse = {
                            id: pedido.id,
                            data: pedido.data,
                            status: pedido.status,
                            cliente: pedido.cliente === undefined ? 0 : pedido.cliente.id,
                            total: pedido.valorTotal.valor,
                            pedidoItems: pedido.itens.map(function (item) { return ({
                                itemId: item.item.id,
                                nome: item.item.nome,
                                preco: item.item.preco.valor,
                                quantidade: item.quantidade.valor
                            }); })
                        };
                        return [2 /*return*/, pedidoResponse];
                }
            });
        });
    };
    /**
     * Atualizar status de um pedido
     * @param body
     * @returns
     */
    PedidoController.prototype.atualizarStatusPedido = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var resposta;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cadastrarPedidoUseCase.atualizaPedido(body.id, body.status)];
                    case 1:
                        resposta = _a.sent();
                        return [2 /*return*/, resposta];
                }
            });
        });
    };
    __decorate([
        (0, tsoa_1.Get)("/id/:id"),
        __param(0, (0, tsoa_1.Path)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", Promise)
    ], PedidoController.prototype, "buscaPorId", null);
    __decorate([
        (0, tsoa_1.Get)("listagem/:status"),
        __param(0, (0, tsoa_1.Path)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], PedidoController.prototype, "buscaPorStatus", null);
    __decorate([
        (0, tsoa_1.Get)("/status/"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], PedidoController.prototype, "buscaPorStatusModulo2", null);
    __decorate([
        (0, tsoa_1.Post)("/"),
        __param(0, (0, tsoa_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], PedidoController.prototype, "cadastrarPedido", null);
    __decorate([
        (0, tsoa_1.Put)("/status"),
        __param(0, (0, tsoa_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], PedidoController.prototype, "atualizarStatusPedido", null);
    PedidoController = __decorate([
        (0, tsoa_1.Route)("pedido"),
        (0, tsoa_1.Tags)("Pedido"),
        __metadata("design:paramtypes", [PedidoGateway_1.PedidoGateway])
    ], PedidoController);
    return PedidoController;
}());
exports.default = PedidoController;
//# sourceMappingURL=PedidoController.js.map