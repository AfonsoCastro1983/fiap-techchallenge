import { Repository } from "typeorm";
import { IPedidoGateway } from "../../../application/interfaces/pedido/IPedidoGateway";
import { PedidoItemRepository, PedidoRepository } from "../repositories/Pedido";
import { AppDataSource } from "../data-source";
import { IPedido } from "../../../application/interfaces/pedido/IPedido";
import { StatusPedido } from "../../../shared/enums/StatusPedido";
import { ClienteRepository } from "../repositories/Cliente";
import { ItemRepository } from "../repositories/Item";
import { ListarPedidosUseCase } from "../../../application/usecases/pedido/ListarPedidoUseCase";

export class PedidoGateway implements IPedidoGateway {
    private repPedido: Repository<PedidoRepository>;

    constructor() {
        this.repPedido = AppDataSource.getRepository(PedidoRepository);
    }

    async criarPedido(pedido: IPedido): Promise<IPedido> {
        console.log('PedidoGateway.criarPedido()');
        console.log(pedido);
        const repPedidoItem = AppDataSource.getRepository(PedidoItemRepository);

        let rep = new PedidoRepository();
        if (pedido.cliente) {
            rep.cliente = new ClienteRepository();
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
        
        rep.status =  StatusPedido[pedido.status.toUpperCase() as keyof typeof StatusPedido];
        
        if (pedido.cliente !== undefined) {
            rep.cliente = new ClienteRepository();
            rep.cliente.id = pedido.cliente.id;
            rep.cliente.nome = pedido.cliente.nome;
        }
        
        rep.total = pedido.valorTotal.valor;
        rep = await this.repPedido.save(rep);
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
        const pedidos = await new ListarPedidosUseCase().buscaPorID(pedido);
        if (!pedidos) {
            throw new Error('Erro na pesquisa de pedidos');
        }
        if (pedidos.length==0) {
            throw new Error('Pedido não encontrado');
        }
        const pedidoRegistrado = pedidos[0];
        console.log('Pedido registrado =>',pedidoRegistrado);

        return pedidoRegistrado;
    }

    async atualizaStatusPedido(pedido: number, novo_status: StatusPedido): Promise<IPedido> {
        let pedidoRegistrado = await this.buscarPedido(pedido);
        if (!pedidoRegistrado) {
            throw new Error('Pedido não encontrado');
        }

        pedidoRegistrado.atualizarStatus(novo_status);

        pedidoRegistrado = await this.criarPedido(pedidoRegistrado);
        return pedidoRegistrado;
    }
}