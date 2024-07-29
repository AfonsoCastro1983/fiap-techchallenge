"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var Cliente_1 = require("./repositories/Cliente");
var Item_1 = require("./repositories/Item");
var Pedido_1 = require("./repositories/Pedido");
var Pagamento_1 = require("./repositories/Pagamento");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log("host:", process.env.TYPEORM_HOST);
console.log("port:", 5432);
console.log("username:", process.env.TYPEORM_USERNAME);
console.log("password:", process.env.TYPEORM_PASS);
console.log("database:", process.env.TYPEORM_DATABASE);
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.TYPEORM_HOST,
    port: 5432,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASS,
    database: process.env.TYPEORM_DATABASE,
    synchronize: true,
    logging: false,
    entities: [Cliente_1.ClienteRepository, Item_1.ItemRepository, Pedido_1.PedidoRepository, Pedido_1.PedidoItemRepository, Pagamento_1.PagamentoRepository],
    migrations: [],
    subscribers: []
});
//# sourceMappingURL=data-source.js.map