"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CPF = void 0;
var CPF = /** @class */ (function () {
    function CPF(value) {
        this.validate(value);
        this._value = value;
    }
    Object.defineProperty(CPF.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    CPF.prototype.validate = function (value) {
        if (!value || !this.isValidCPF(value)) {
            throw new Error('CPF inválido');
        }
    };
    CPF.prototype.isValidCPF = function (cpf) {
        cpf = cpf.replace(/[^0-9]/g, ''); // Remove caracteres não numéricos
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) { // CPF inválido
            return false;
        }
        var sum = 0;
        for (var i = 0; i < 9; i++) {
            sum += parseInt(cpf.charAt(i)) * (10 - i);
        }
        var remainder = (sum % 11) % 10;
        if (remainder !== parseInt(cpf.charAt(9))) {
            return false;
        }
        sum = 0;
        for (var i = 0; i < 10; i++) {
            sum += parseInt(cpf.charAt(i)) * (11 - i);
        }
        remainder = (sum % 11) % 10;
        if (remainder !== parseInt(cpf.charAt(10))) {
            return false;
        }
        return true;
    };
    return CPF;
}());
exports.CPF = CPF;
//# sourceMappingURL=CPF.js.map