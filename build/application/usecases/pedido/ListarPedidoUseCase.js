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
exports.ListarPedidosUseCase = void 0;
var data_source_1 = require("../../../infra/database/data-source");
var Pedido_1 = require("../../../infra/database/repositories/Pedido");
var StatusPedido_1 = require("../../../shared/enums/StatusPedido");
var Pedido_2 = require("../../../domain/entities/Pedido");
var typeorm_1 = require("typeorm");
var Item_1 = require("../../../domain/entities/Item");
var Preco_1 = require("../../../shared/valueobjects/Preco");
var ClienteGateway_1 = require("../../../infra/database/gateways/ClienteGateway");
var ListarPedidosUseCase = /** @class */ (function () {
    function ListarPedidosUseCase() {
    }
    ListarPedidosUseCase.prototype.converteRepositoryEmPedido = function (repository) {
        return __awaiter(this, void 0, void 0, function () {
            var pedido, repPedidoItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pedido = new Pedido_2.Pedido();
                        if (repository.cliente) {
                            pedido.cliente = new ClienteGateway_1.ClienteGateway().gerarClientePorRepositorio(repository.cliente);
                        }
                        pedido.data = repository.data;
                        pedido.id = repository.id;
                        pedido.atualizarStatus(repository.status);
                        return [4 /*yield*/, data_source_1.AppDataSource.getRepository(Pedido_1.PedidoItemRepository).find({ where: { pedido: repository }, relations: ["item"] })];
                    case 1:
                        repPedidoItem = _a.sent();
                        repPedidoItem.forEach(function (element) {
                            console.log('converteRepositoryEmPedido loop');
                            pedido.adicionarItem(new Item_1.Item(element.item.id, element.item.nome, element.item.descricao, new Preco_1.Preco(element.preco), element.item.ingredientes, element.item.categoria), element.quantidade);
                        });
                        return [2 /*return*/, pedido];
                }
            });
        });
    };
    ListarPedidosUseCase.prototype.buscaPorID = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            var repPedido, repPedidos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repPedido = data_source_1.AppDataSource.getRepository(Pedido_1.PedidoRepository);
                        console.log("Id", index);
                        return [4 /*yield*/, repPedido.find({ where: { id: index }, relations: ["cliente", "pedidoItems"], order: { data: 'ASC' } })];
                    case 1:
                        repPedidos = _a.sent();
                        return [2 /*return*/, this.converteArrayPedidos(repPedidos)];
                }
            });
        });
    };
    ListarPedidosUseCase.prototype.converteArrayPedidos = function (repPedidos) {
        return __awaiter(this, void 0, void 0, function () {
            var pedidos, _i, repPedidos_1, element, pedido;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pedidos = [];
                        _i = 0, repPedidos_1 = repPedidos;
                        _a.label = 1;
                    case 1:
                        if (!(_i < repPedidos_1.length)) return [3 /*break*/, 4];
                        element = repPedidos_1[_i];
                        return [4 /*yield*/, this.converteRepositoryEmPedido(element)];
                    case 2:
                        pedido = _a.sent();
                        pedidos.push(pedido);
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, pedidos];
                }
            });
        });
    };
    ListarPedidosUseCase.prototype.buscaPorStatus = function (status) {
        return __awaiter(this, void 0, void 0, function () {
            var repPedido, statusValido, repPedidos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repPedido = data_source_1.AppDataSource.getRepository(Pedido_1.PedidoRepository);
                        statusValido = StatusPedido_1.StatusPedido[status.toUpperCase()];
                        if (!statusValido) return [3 /*break*/, 2];
                        return [4 /*yield*/, repPedido.find({ where: { status: statusValido }, relations: ['cliente', 'pedidoItems'], order: { data: 'ASC' } })];
                    case 1:
                        repPedidos = _a.sent();
                        return [2 /*return*/, this.converteArrayPedidos(repPedidos)];
                    case 2: throw new Error('Status inválido');
                }
            });
        });
    };
    ListarPedidosUseCase.prototype.buscaPorStatusModulo2 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var repPedido, statusValido, repPedidos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repPedido = data_source_1.AppDataSource.getRepository(Pedido_1.PedidoRepository);
                        statusValido = [StatusPedido_1.StatusPedido.PRONTO_PARA_ENTREGA, StatusPedido_1.StatusPedido.EM_PREPARACAO, StatusPedido_1.StatusPedido.ENVIADO_PARA_A_COZINHA];
                        if (!statusValido) return [3 /*break*/, 2];
                        return [4 /*yield*/, repPedido.find({ where: { status: (0, typeorm_1.In)(statusValido) }, relations: ['cliente', 'pedidoItems'], order: { status: 'DESC', data: 'ASC' } })];
                    case 1:
                        repPedidos = _a.sent();
                        return [2 /*return*/, this.converteArrayPedidos(repPedidos)];
                    case 2: throw new Error('Status inválido');
                }
            });
        });
    };
    return ListarPedidosUseCase;
}());
exports.ListarPedidosUseCase = ListarPedidosUseCase;
//# sourceMappingURL=ListarPedidoUseCase.js.map