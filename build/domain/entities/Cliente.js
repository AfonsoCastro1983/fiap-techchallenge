"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
var Cliente = /** @class */ (function () {
    function Cliente(id, nome, email, cpf) {
        this._id = id;
        this._nome = nome;
        this._email = email;
        this._cpf = cpf;
    }
    Object.defineProperty(Cliente.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cliente.prototype, "nome", {
        get: function () {
            return this._nome;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cliente.prototype, "email", {
        get: function () {
            return this._email;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cliente.prototype, "cpf", {
        get: function () {
            return this._cpf;
        },
        enumerable: false,
        configurable: true
    });
    Cliente.prototype.setEmail = function (email) {
        this._email = email;
    };
    Cliente.prototype.setCpf = function (cpf) {
        this._cpf = cpf;
    };
    return Cliente;
}());
exports.Cliente = Cliente;
//# sourceMappingURL=Cliente.js.map