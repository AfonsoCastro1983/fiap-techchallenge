"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Preco = void 0;
var Preco = /** @class */ (function () {
    function Preco(valor) {
        if (valor < 0) {
            throw new Error('Valor do preço não pode ser negativo.');
        }
        this._valor = valor;
    }
    Object.defineProperty(Preco.prototype, "valor", {
        get: function () {
            return this._valor;
        },
        enumerable: false,
        configurable: true
    });
    Preco.prototype.somar = function (outroDinheiro) {
        return new Preco(this._valor + outroDinheiro.valor);
    };
    Preco.prototype.subtrair = function (outroDinheiro) {
        if (this._valor < outroDinheiro.valor) {
            throw new Error('Não é possível subtrair um valor maior do que o valor atual.');
        }
        return new Preco(this._valor - outroDinheiro.valor);
    };
    Preco.prototype.toString = function () {
        return "R$ ".concat(this._valor.toFixed(2));
    };
    return Preco;
}());
exports.Preco = Preco;
//# sourceMappingURL=Preco.js.map