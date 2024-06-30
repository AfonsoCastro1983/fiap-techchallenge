"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagamento = void 0;
var StatusPagamento_1 = require("../../shared/enums/StatusPagamento");
var Pagamento = /** @class */ (function () {
    function Pagamento(id, valor) {
        this._id = id;
        this._valor = valor;
        this._status = StatusPagamento_1.StatusPagamento.AGUARDANDO_RESPOSTA;
        this._dataCriacao = new Date();
        this._identificador_pedido = "";
        this._qrCodeCodigo = "";
    }
    Object.defineProperty(Pagamento.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pagamento.prototype, "valor", {
        get: function () {
            return this._valor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pagamento.prototype, "status", {
        get: function () {
            return this._status;
        },
        set: function (value) {
            this._status = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pagamento.prototype, "dataCriacao", {
        get: function () {
            return this._dataCriacao;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pagamento.prototype, "identificadorPedido", {
        get: function () {
            return this._identificador_pedido;
        },
        set: function (value) {
            this._identificador_pedido = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pagamento.prototype, "qrCode", {
        get: function () {
            return this._qrCodeCodigo;
        },
        set: function (value) {
            this._qrCodeCodigo = value;
        },
        enumerable: false,
        configurable: true
    });
    Pagamento.prototype.confirmarPagamento = function () {
        this._status = StatusPagamento_1.StatusPagamento.PAGO;
    };
    Pagamento.prototype.cancelarPagamento = function () {
        this._status = StatusPagamento_1.StatusPagamento.CANCELADO;
    };
    return Pagamento;
}());
exports.Pagamento = Pagamento;
//# sourceMappingURL=Pagamento.js.map