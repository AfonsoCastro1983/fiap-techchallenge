"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
var Item = /** @class */ (function () {
    function Item(id, nome, descricao, preco, ingredientes, categoria) {
        this._id = id;
        this._nome = nome;
        this._descricao = descricao;
        this._preco = preco;
        this._ingredientes = ingredientes;
        this._categoria = categoria;
    }
    Object.defineProperty(Item.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "nome", {
        get: function () {
            return this._nome;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "descricao", {
        get: function () {
            return this._descricao;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "preco", {
        get: function () {
            return this._preco;
        },
        set: function (value) {
            this._preco = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "ingredientes", {
        get: function () {
            return this._ingredientes;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "categoria", {
        get: function () {
            return this._categoria;
        },
        enumerable: false,
        configurable: true
    });
    return Item;
}());
exports.Item = Item;
//# sourceMappingURL=Item.js.map