"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
var Email = /** @class */ (function () {
    function Email(value) {
        this.validate(value);
        this._value = value;
    }
    Object.defineProperty(Email.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    Email.prototype.validate = function (value) {
        if (!value || !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            throw new Error('Email inválido');
        }
    };
    return Email;
}());
exports.Email = Email;
//# sourceMappingURL=Email.js.map