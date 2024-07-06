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
        if (cpf.length !== 11) { // CPF deve ter 11 dígitos
            return false;
        }
        // Verifica se todos os dígitos são iguais
        if (/^(\d)\1+$/.test(cpf)) {
            return false;
        }
        var sum = 0;
        var remainder;
        // Calcula o primeiro dígito verificador
        for (var i = 1; i <= 9; i++) {
            sum += parseInt(cpf.charAt(i - 1)) * (11 - i);
        }
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11)
            remainder = 0;
        if (remainder !== parseInt(cpf.charAt(9)))
            return false;
        sum = 0;
        // Calcula o segundo dígito verificador
        for (var i = 1; i <= 10; i++) {
            sum += parseInt(cpf.charAt(i - 1)) * (12 - i);
        }
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11)
            remainder = 0;
        if (remainder !== parseInt(cpf.charAt(10)))
            return false;
        return true;
    };
    return CPF;
}());
exports.CPF = CPF;
//# sourceMappingURL=CPF.js.map