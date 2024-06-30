"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quantidade = void 0;
var Quantidade = /** @class */ (function () {
    function Quantidade(value) {
        this._value = 1;
        this.alterarQuantidade(value);
    }
    Object.defineProperty(Quantidade.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    Quantidade.prototype.alterarQuantidade = function (value) {
        if (value <= 0) {
            throw new Error('Quantidade não pode ser menor ou igual a zero');
        }
        this._value = value;
    };
    return Quantidade;
}());
exports.Quantidade = Quantidade;
//# sourceMappingURL=Quantidade.js.map