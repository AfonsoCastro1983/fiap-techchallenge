import "reflect-metadata"
import { DataSource } from "typeorm"
import { ClienteRepository } from "./repositories/Cliente"
import { ItemRepository } from "./repositories/Item"
import { PedidoRepository, PedidoItemRepository } from "./repositories/Pedido"
import { PagamentoRepository } from "./repositories/Pagamento"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: "test",
    password: "test",
    database: "lanchonete",
    synchronize: true,
    logging: false,
    entities: [ClienteRepository, ItemRepository, PedidoRepository, PedidoItemRepository, PagamentoRepository],
    migrations: [],
    subscribers: [],
})
