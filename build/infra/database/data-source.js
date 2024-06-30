"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var Cliente_1 = require("./repositories/Cliente");
var Item_1 = require("./repositories/Item");
var Pedido_1 = require("./repositories/Pedido");
var Pagamento_1 = require("./repositories/Pagamento");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: "test",
    password: "test",
    database: "lanchonete",
    synchronize: true,
    logging: false,
    entities: [Cliente_1.ClienteRepository, Item_1.ItemRepository, Pedido_1.PedidoRepository, Pedido_1.PedidoItemRepository, Pagamento_1.PagamentoRepository],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map