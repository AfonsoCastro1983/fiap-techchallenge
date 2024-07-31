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
exports.PagamentoRepository = void 0;
var typeorm_1 = require("typeorm");
var Pedido_1 = require("./Pedido");
var StatusPagamento_1 = require("../../../shared/enums/StatusPagamento");
var PagamentoRepository = /** @class */ (function () {
    function PagamentoRepository() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], PagamentoRepository.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'decimal' }),
        __metadata("design:type", Number)
    ], PagamentoRepository.prototype, "valor", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'enum',
            enum: StatusPagamento_1.StatusPagamento
        }),
        __metadata("design:type", String)
    ], PagamentoRepository.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Pedido_1.PedidoRepository; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)({ name: 'pedidoId' }),
        __metadata("design:type", Pedido_1.PedidoRepository)
    ], PagamentoRepository.prototype, "pedido", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], PagamentoRepository.prototype, "identificador_pedido", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], PagamentoRepository.prototype, "qrcode", void 0);
    PagamentoRepository = __decorate([
        (0, typeorm_1.Entity)()
    ], PagamentoRepository);
    return PagamentoRepository;
}());
exports.PagamentoRepository = PagamentoRepository;
//# sourceMappingURL=Pagamento.js.map