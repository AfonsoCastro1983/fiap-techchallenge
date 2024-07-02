"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadastrarItemDto = void 0;
var Categoria_1 = require("../../shared/enums/Categoria");
var CadastrarItemDto = /** @class */ (function () {
    function CadastrarItemDto() {
        this.nome = "";
        this.descricao = "";
        this.preco = 0;
        this.ingredientes = "";
        this.categoria = Categoria_1.Categoria.LANCHE;
    }
    return CadastrarItemDto;
}());
exports.CadastrarItemDto = CadastrarItemDto;
//# sourceMappingURL=CadastrarItemDto.js.map