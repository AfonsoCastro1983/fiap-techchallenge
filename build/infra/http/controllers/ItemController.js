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
var CadastrarItemUseCase_1 = require("../../../application/usecases/item/CadastrarItemUseCase");
var Categoria_1 = require("../../../shared/enums/Categoria");
var ListarItensUseCase_1 = require("../../../application/usecases/item/ListarItensUseCase");
var ItemGateway_1 = require("../../database/gateways/ItemGateway");
var ItemController = /** @class */ (function () {
    function ItemController(itemGateway) {
        this.cadastrarItemUseCase = new CadastrarItemUseCase_1.CadastrarItemUseCase(itemGateway);
    }
    /**
     * Cadastro de um item no cardápio
     */
    ItemController.prototype.salvarNovoItem = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var dto, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dto = {
                            nome: body.nome,
                            descricao: body.descricao,
                            preco: body.preco,
                            ingredientes: body.ingredientes,
                            categoria: Categoria_1.Categoria[body.categoria.toUpperCase()]
                        };
                        return [4 /*yield*/, this.cadastrarItemUseCase.execute(dto)];
                    case 1:
                        item = _a.sent();
                        return [2 /*return*/, {
                                id: item.id,
                                nome: item.nome,
                                descricao: item.descricao,
                                preco: item.preco.valor,
                                ingredientes: item.ingredientes,
                                categoria: item.categoria
                            }];
                }
            });
        });
    };
    /**
     * Modificar um item do cardápio
     */
    ItemController.prototype.editarItem = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var dto, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dto = {
                            id: body.id,
                            nome: body.nome,
                            descricao: body.descricao,
                            preco: body.preco,
                            ingredientes: body.ingredientes,
                            categoria: Categoria_1.Categoria[body.categoria.toUpperCase()]
                        };
                        return [4 /*yield*/, this.cadastrarItemUseCase.execute(dto)];
                    case 1:
                        item = _a.sent();
                        return [2 /*return*/, {
                                id: item.id,
                                nome: item.nome,
                                descricao: item.descricao,
                                preco: item.preco.valor,
                                ingredientes: item.ingredientes,
                                categoria: item.categoria
                            }];
                }
            });
        });
    };
    /**
     * Elimina o item escolhido
     * @param id identificador do item
     * @returns
     * Verdadeiro se o item foi excluído ou falso se houve algum erro na excluão ou o item não existe
     */
    ItemController.prototype.eliminarItem = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var resposta;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cadastrarItemUseCase.delete(id)];
                    case 1:
                        resposta = _a.sent();
                        return [2 /*return*/, resposta];
                }
            });
        });
    };
    /**
     * Lista todos os itens por categoria
     * @param categoria
     * @returns
     */
    ItemController.prototype.buscaItemPorCategoria = function (categoria) {
        return __awaiter(this, void 0, void 0, function () {
            var listaCategoria, itens, itensResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        listaCategoria = new ListarItensUseCase_1.ListarItensUseCase(new ItemGateway_1.ItemGateway());
                        return [4 /*yield*/, listaCategoria.listarPorCategoria(categoria.toUpperCase())];
                    case 1:
                        itens = _a.sent();
                        itensResponse = { itens: [] };
                        itens.forEach(function (element) {
                            itensResponse.itens.push({
                                id: element.id,
                                nome: element.nome,
                                descricao: element.descricao,
                                preco: element.preco.valor,
                                ingredientes: element.ingredientes,
                                categoria: element.categoria
                            });
                        });
                        return [2 /*return*/, itensResponse];
                }
            });
        });
    };
    __decorate([
        (0, tsoa_1.Post)("/"),
        __param(0, (0, tsoa_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], ItemController.prototype, "salvarNovoItem", null);
    __decorate([
        (0, tsoa_1.Put)("/"),
        __param(0, (0, tsoa_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], ItemController.prototype, "editarItem", null);
    __decorate([
        (0, tsoa_1.Delete)("/:id"),
        __param(0, (0, tsoa_1.Path)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", Promise)
    ], ItemController.prototype, "eliminarItem", null);
    __decorate([
        (0, tsoa_1.Get)("/:categoria"),
        __param(0, (0, tsoa_1.Path)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], ItemController.prototype, "buscaItemPorCategoria", null);
    ItemController = __decorate([
        (0, tsoa_1.Route)("item"),
        (0, tsoa_1.Tags)("Item"),
        __metadata("design:paramtypes", [ItemGateway_1.ItemGateway])
    ], ItemController);
    return ItemController;
}());
exports.default = ItemController;
//# sourceMappingURL=ItemController.js.map