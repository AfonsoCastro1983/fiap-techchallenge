"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pedido = void 0;
var Preco_1 = require("../../shared/valueobjects/Preco");
var PedidoItem_1 = require("./PedidoItem");
var StatusPedido_1 = require("../../shared/enums/StatusPedido");
var Pedido = /** @class */ (function () {
    function Pedido() {
        this._id = 0;
        this._itens = [];
        this._status = StatusPedido_1.StatusPedido.NOVO;
        this._valorTotal = new Preco_1.Preco(0);
        this.atualizarValorTotal(this._itens);
        this._dataCriacao = new Date();
    }
    Pedido.prototype.atualizarValorTotal = function (itens) {
        this._valorTotal = itens.reduce(function (total, item) { return total.somar(item.total); }, new Preco_1.Preco(0));
    };
    Object.defineProperty(Pedido.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pedido.prototype, "cliente", {
        get: function () {
            return this._cliente;
        },
        set: function (value) {
            this._cliente = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pedido.prototype, "itens", {
        get: function () {
            return this._itens;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pedido.prototype, "status", {
        get: function () {
            return this._status;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pedido.prototype, "valorTotal", {
        get: function () {
            return this._valorTotal;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pedido.prototype, "data", {
        get: function () {
            return this._dataCriacao;
        },
        set: function (value) {
            this._dataCriacao = value;
        },
        enumerable: false,
        configurable: true
    });
    Pedido.prototype.atualizarStatus = function (novoStatus) {
        this._status = novoStatus;
    };
    Pedido.prototype.adicionarItem = function (itemAdicionado, quantidade) {
        var itemEncontrado = this._itens.find(function (it) { return it.item.id == itemAdicionado.id; });
        //Atualizar o item    
        if (itemEncontrado) {
            itemEncontrado.alterarQuantidade(quantidade);
        }
        else {
            var novoItem = new PedidoItem_1.PedidoItem(itemAdicionado, quantidade);
            this._itens.push(novoItem);
        }
        //Atualizar total
        this.atualizarValorTotal(this._itens);
    };
    Pedido.prototype.eliminarItem = function (idItem) {
        this._itens = this._itens.filter(function (item) { return item.item.id !== idItem; });
        this.atualizarValorTotal(this._itens);
    };
    return Pedido;
}());
exports.Pedido = Pedido;
//# sourceMappingURL=Pedido.js.map