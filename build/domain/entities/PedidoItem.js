"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoItem = void 0;
var Preco_1 = require("../../shared/valueobjects/Preco");
var Quantidade_1 = require("../../shared/valueobjects/Quantidade");
var PedidoItem = /** @class */ (function () {
    function PedidoItem(item, quantidade) {
        this._item = item;
        this._quantidade = new Quantidade_1.Quantidade(quantidade);
    }
    Object.defineProperty(PedidoItem.prototype, "item", {
        get: function () {
            return this._item;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PedidoItem.prototype, "quantidade", {
        get: function () {
            return this._quantidade;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PedidoItem.prototype, "total", {
        get: function () {
            return new Preco_1.Preco(this._item.preco.valor * this._quantidade.value);
        },
        enumerable: false,
        configurable: true
    });
    PedidoItem.prototype.alterarQuantidade = function (quantidade) {
        this._quantidade.alterarQuantidade(quantidade);
    };
    return PedidoItem;
}());
exports.PedidoItem = PedidoItem;
//# sourceMappingURL=PedidoItem.js.map