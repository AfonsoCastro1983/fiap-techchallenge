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
exports.CadastrarPedidoUseCase = void 0;
var data_source_1 = require("../../../infra/database/data-source");
var Cliente_1 = require("../../../infra/database/repositories/Cliente");
var Item_1 = require("../../../infra/database/repositories/Item");
var Pedido_1 = require("../../../infra/database/repositories/Pedido");
var Cliente_2 = require("../../../domain/entities/Cliente");
var Item_2 = require("../../../domain/entities/Item");
var Pedido_2 = require("../../../domain/entities/Pedido");
var StatusPedido_1 = require("../../../shared/enums/StatusPedido");
var PedidoItem_1 = require("../../../domain/entities/PedidoItem");
var Preco_1 = require("../../../shared/valueobjects/Preco");
var CadastrarPedidoUseCase = /** @class */ (function () {
    function CadastrarPedidoUseCase() {
    }
    CadastrarPedidoUseCase.prototype.execute = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var repPedido, repCliente, repItem, repPedidoItem, pedido, pesq, itens, cliente, itens_1, rep, pedidoid;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repPedido = data_source_1.AppDataSource.getRepository(Pedido_1.PedidoRepository);
                        repCliente = data_source_1.AppDataSource.getRepository(Cliente_1.ClienteRepository);
                        repItem = data_source_1.AppDataSource.getRepository(Item_1.ItemRepository);
                        repPedidoItem = data_source_1.AppDataSource.getRepository(Pedido_1.PedidoItemRepository);
                        pedido = new Pedido_2.Pedido();
                        console.log("Busca pedido");
                        if (!(dto.id !== undefined)) return [3 /*break*/, 3];
                        return [4 /*yield*/, repPedido.findOne({ where: { id: dto.id }, relations: ['cliente', 'pedidoItems'] })];
                    case 1:
                        pesq = _a.sent();
                        if (!pesq) return [3 /*break*/, 3];
                        if (pesq.cliente) {
                            pedido.cliente = new Cliente_2.Cliente(pesq.cliente.id, pesq.cliente.nome);
                        }
                        return [4 /*yield*/, Promise.all(pesq.pedidoItems.map(function (itemDto) { return __awaiter(_this, void 0, void 0, function () {
                                var item;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, repItem.findOneBy({ id: itemDto.id })];
                                        case 1:
                                            item = _a.sent();
                                            if (!item) {
                                                throw new Error("Item com ID ".concat(itemDto.id, " n\u00E3o encontrado."));
                                            }
                                            return [2 /*return*/, new PedidoItem_1.PedidoItem(new Item_2.Item(item.id, item.nome, item.descricao, new Preco_1.Preco(itemDto.preco), item.ingredientes, item.categoria), itemDto.quantidade)];
                                    }
                                });
                            }); }))];
                    case 2:
                        itens = _a.sent();
                        itens.forEach(function (element) {
                            pedido.adicionarItem(element.item, element.quantidade.valor);
                        });
                        console.log(pedido);
                        _a.label = 3;
                    case 3:
                        console.log("Busca cliente");
                        if (!(dto.cliente !== undefined)) return [3 /*break*/, 5];
                        return [4 /*yield*/, repCliente.findOneBy({ id: dto.cliente })];
                    case 4:
                        cliente = _a.sent();
                        if (cliente) {
                            pedido.cliente = new Cliente_2.Cliente(cliente.id, cliente.nome);
                        }
                        else {
                            throw new Error("Cliente com ID ".concat(dto.cliente, " n\u00E3o encontrado."));
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        pedido.cliente = undefined;
                        _a.label = 6;
                    case 6:
                        console.log("Busca itens pelo ID");
                        if (!dto.itens) return [3 /*break*/, 8];
                        return [4 /*yield*/, Promise.all(dto.itens.map(function (itemDto) { return __awaiter(_this, void 0, void 0, function () {
                                var item;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, repItem.findOneBy({ id: itemDto.itemId })];
                                        case 1:
                                            item = _a.sent();
                                            if (!item) {
                                                throw new Error("Item com ID ".concat(itemDto.itemId, " n\u00E3o encontrado."));
                                            }
                                            return [2 /*return*/, new PedidoItem_1.PedidoItem(new Item_2.Item(item.id, item.nome, item.descricao, new Preco_1.Preco(item.preco), item.ingredientes, item.categoria), itemDto.quantidade)];
                                    }
                                });
                            }); }))];
                    case 7:
                        itens_1 = _a.sent();
                        //Elimina itens gravados no pedido que foram excluídos pelo cliente
                        pedido.itens.forEach(function (element) {
                            var itemEncontrado = itens_1.find(function (item) { return item.item.id == element.item.id; });
                            if (!itemEncontrado) {
                                pedido.eliminarItem(element.item.id);
                            }
                        });
                        //Ajusta quantidades e valores dos itens escolhidos
                        itens_1.forEach(function (element) {
                            pedido.adicionarItem(element.item, element.quantidade.valor);
                        });
                        _a.label = 8;
                    case 8:
                        console.log("Pedido repository");
                        rep = new Pedido_1.PedidoRepository();
                        if (!(pedido.id > 0)) return [3 /*break*/, 10];
                        console.log('criação id já existente');
                        rep.id = pedido.id;
                        pedidoid = rep.id;
                        return [4 /*yield*/, repPedidoItem.createQueryBuilder().
                                delete().
                                from(Pedido_1.PedidoItemRepository).
                                where("pedidoId = :pedidoid", { pedidoid: pedidoid }).
                                execute()];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        rep.data = new Date();
                        rep.status = pedido.status;
                        if (pedido.cliente !== undefined) {
                            rep.cliente = new Cliente_1.ClienteRepository();
                            rep.cliente.id = pedido.cliente.id;
                            rep.cliente.nome = pedido.cliente.nome;
                        }
                        rep.total = pedido.valorTotal.valor;
                        return [4 /*yield*/, repPedido.save(rep)];
                    case 11:
                        rep = _a.sent();
                        rep.pedidoItems = [];
                        pedido.itens.forEach(function (element) {
                            var repPedItem = new Pedido_1.PedidoItemRepository();
                            repPedItem.pedido = rep;
                            repPedItem.item = new Item_1.ItemRepository();
                            repPedItem.item.id = element.item.id;
                            repPedItem.item.categoria = element.item.categoria;
                            repPedItem.item.descricao = element.item.descricao;
                            repPedItem.item.ingredientes = element.item.ingredientes;
                            repPedItem.item.nome = element.item.nome;
                            repPedItem.item.preco = element.item.preco.valor;
                            repPedItem.preco = element.item.preco.valor;
                            repPedItem.quantidade = element.quantidade.valor;
                            rep.pedidoItems.push(repPedItem);
                        });
                        console.log(rep.pedidoItems);
                        pedido.id = rep.id;
                        return [4 /*yield*/, repPedidoItem.save(rep.pedidoItems)];
                    case 12:
                        _a.sent();
                        return [2 /*return*/, pedido];
                }
            });
        });
    };
    CadastrarPedidoUseCase.prototype.atualizaPedido = function (id, status) {
        return __awaiter(this, void 0, void 0, function () {
            var repPedido, pedido, statusValido;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repPedido = data_source_1.AppDataSource.getRepository(Pedido_1.PedidoRepository);
                        return [4 /*yield*/, repPedido.findOneBy({ id: id })];
                    case 1:
                        pedido = _a.sent();
                        if (pedido) {
                            statusValido = StatusPedido_1.StatusPedido[status.toUpperCase()];
                            if (statusValido) {
                                pedido.status = statusValido;
                                try {
                                    repPedido.save(pedido);
                                    if (statusValido == StatusPedido_1.StatusPedido.ENVIAR_PARA_PAGAMENTO) {
                                        //Inicia o status de pagamento
                                    }
                                    return [2 /*return*/, true];
                                }
                                catch (error) {
                                    return [2 /*return*/, false];
                                }
                            }
                            else {
                                throw new Error('Status inválido');
                            }
                        }
                        else {
                            throw new Error('Pedido não encontrado');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return CadastrarPedidoUseCase;
}());
exports.CadastrarPedidoUseCase = CadastrarPedidoUseCase;
//# sourceMappingURL=CadastrarPedidoUseCase.js.map