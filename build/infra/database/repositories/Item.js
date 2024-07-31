"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemRepository = void 0;
var typeorm_1 = require("typeorm");
var Categoria_1 = require("../../../shared/enums/Categoria");
var ItemRepository = /** @class */ (function () {
    function ItemRepository() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], ItemRepository.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], ItemRepository.prototype, "nome", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], ItemRepository.prototype, "descricao", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'decimal' }),
        __metadata("design:type", Number)
    ], ItemRepository.prototype, "preco", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], ItemRepository.prototype, "ingredientes", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'enum',
            enum: Categoria_1.Categoria
        }),
        __metadata("design:type", String)
    ], ItemRepository.prototype, "categoria", void 0);
    ItemRepository = __decorate([
        (0, typeorm_1.Entity)()
    ], ItemRepository);
    return ItemRepository;
}());
exports.ItemRepository = ItemRepository;
//# sourceMappingURL=Item.js.map