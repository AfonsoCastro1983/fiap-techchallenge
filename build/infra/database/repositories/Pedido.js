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
exports.PedidoItemRepository = exports.PedidoRepository = void 0;
var typeorm_1 = require("typeorm");
var Cliente_1 = require("./Cliente");
var Item_1 = require("./Item");
var StatusPedido_1 = require("../../../shared/enums/StatusPedido");
var PedidoRepository = /** @class */ (function () {
    function PedidoRepository() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], PedidoRepository.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Date)
    ], PedidoRepository.prototype, "data", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'enum',
            enum: StatusPedido_1.StatusPedido
        }),
        __metadata("design:type", String)
    ], PedidoRepository.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Cliente_1.ClienteRepository; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)({ name: 'clienteId' }),
        __metadata("design:type", Cliente_1.ClienteRepository)
    ], PedidoRepository.prototype, "cliente", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'decimal' }),
        __metadata("design:type", Number)
    ], PedidoRepository.prototype, "total", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return PedidoItemRepository; }, function (pedidoItem) { return pedidoItem.pedido; }),
        __metadata("design:type", Array)
    ], PedidoRepository.prototype, "pedidoItems", void 0);
    PedidoRepository = __decorate([
        (0, typeorm_1.Entity)()
    ], PedidoRepository);
    return PedidoRepository;
}());
exports.PedidoRepository = PedidoRepository;
var PedidoItemRepository = /** @class */ (function () {
    function PedidoItemRepository() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], PedidoItemRepository.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return PedidoRepository; }, function (pedido) { return pedido.pedidoItems; }),
        (0, typeorm_1.JoinColumn)({ name: 'pedidoId' }),
        __metadata("design:type", PedidoRepository)
    ], PedidoItemRepository.prototype, "pedido", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Item_1.ItemRepository; }),
        (0, typeorm_1.JoinColumn)({ name: 'itemId' }),
        __metadata("design:type", Item_1.ItemRepository)
    ], PedidoItemRepository.prototype, "item", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'int' }),
        __metadata("design:type", Number)
    ], PedidoItemRepository.prototype, "quantidade", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'decimal' }),
        __metadata("design:type", Number)
    ], PedidoItemRepository.prototype, "preco", void 0);
    PedidoItemRepository = __decorate([
        (0, typeorm_1.Entity)()
    ], PedidoItemRepository);
    return PedidoItemRepository;
}());
exports.PedidoItemRepository = PedidoItemRepository;
//# sourceMappingURL=Pedido.js.map