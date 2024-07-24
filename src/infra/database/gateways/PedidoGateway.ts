import { Repository } from "typeorm";
import { IPedidoGateway } from "../../../application/interfaces/pedido/IPedidoGateway";
import { PedidoItemRepository, PedidoRepository } from "../repositories/Pedido";
import { AppDataSource } from "../data-source";
import { IPedido } from "../../../application/interfaces/pedido/IPedido";
import { StatusPedido } from "../../../shared/enums/StatusPedido";
import { Pedido } from "../../../domain/entities/Pedido";
import { Cliente } from "../../../domain/entities/Cliente";
import { Item } from "../../../domain/entities/Item";
import { Preco } from "../../../shared/valueobjects/Preco";
import { ClienteRepository } from "../repositories/Cliente";
import { ItemRepository } from "../repositories/Item";

export class PedidoGateway implements IPedidoGateway {
    private repPedido: Repository<PedidoRepository>;

    constructor() {
        this.repPedido = AppDataSource.getRepository(PedidoRepository);
    }

    async criarPedido(pedido: IPedido): Promise<IPedido> {
        const repPedido = AppDataSource.getRepository(PedidoRepository);
        const repPedidoItem = AppDataSource.getRepository(PedidoItemRepository);

        let rep = new PedidoRepository();
        if (pedido.cliente) {
            rep.cliente.id = pedido.cliente.id;
        }
        if (pedido.id > 0) {
            console.log('criação id já existente');
            rep.id = pedido.id;
            const pedidoid: number = rep.id;
            await repPedidoItem.createQueryBuilder().
                delete().
                from(PedidoItemRepository).
                where("pedidoId = :pedidoid", { pedidoid }).
                execute();
        }
        
        rep.data = new Date();
        rep.status =  StatusPedido[pedido.status as keyof typeof StatusPedido];
        if (pedido.cliente !== undefined) {
            rep.cliente = new ClienteRepository();
            rep.cliente.id = pedido.cliente.id;
            rep.cliente.nome = pedido.cliente.nome;
        }
        rep.total = pedido.valorTotal.valor;
        rep = await repPedido.save(rep);
        rep.pedidoItems = [];
        pedido.itens.forEach(element => {
            let repPedItem = new PedidoItemRepository();
            repPedItem.pedido = rep;
            repPedItem.item = new ItemRepository();
            repPedItem.item.id = element.item.id;
            repPedItem.item.categoria = element.item.categoria;
            repPedItem.item.descricao = element.item.descricao;
            repPedItem.item.ingredientes = element.item.ingredientes;
            repPedItem.item.nome = element.item.nome;
            repPedItem.item.preco = element.item.preco.valor;
            repPedItem.preco = element.item.preco.valor;
            repPedItem.quantidade = element.quantidade.valor;
            rep.pedidoItems.push(repPedItem);
        });
        console.log(rep.pedidoItems);
        pedido.id = rep.id;
        await repPedidoItem.save(rep.pedidoItems);

        return pedido;        
    }

    async buscarPedido(pedido: number): Promise<IPedido> {
        console.log("buscarPedido");
        const repPedidos = await this.repPedido.find({ where: { id: pedido }, relations: ["cliente","pedidoItems"], order: { data: 'ASC' } });
        if (!repPedidos) {
            throw new Error('Pedido não encontrado');
        }
        const pedidoRegistrado = new Pedido();
        pedidoRegistrado.id = repPedidos[0].id;
        pedidoRegistrado.cliente = new Cliente(repPedidos[0].cliente.id, repPedidos[0].cliente.nome);       
        pedidoRegistrado.atualizarStatus(repPedidos[0].status);

        const repPedidoItem = await AppDataSource.getRepository(PedidoItemRepository).find({where: {pedido: repPedidos}, relations: ["item"]});
        repPedidoItem.forEach(element => {
            pedidoRegistrado.adicionarItem(new Item(element.item.id, element.item.nome, element.item.descricao, new Preco(element.preco), element.item.ingredientes,element.item.categoria),element.quantidade);
        });

        return pedidoRegistrado;        
    }

    async atualizaStatusPedido(pedido: number, novo_status: StatusPedido): Promise<IPedido> {
        let pedidoRegistrado = await this.buscarPedido(pedido);
        if (!pedidoRegistrado) {
            throw new Error('Pedido não encontrado');
        }

        pedidoRegistrado.status = novo_status;

        pedidoRegistrado = await this.criarPedido(pedidoRegistrado);
        return pedidoRegistrado;
    }
}