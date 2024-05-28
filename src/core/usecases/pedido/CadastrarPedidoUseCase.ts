import { AppDataSource } from "../../../infra/database/data-source";
import { ClienteRepository } from "../../../infra/database/repositories/Cliente";
import { ItemRepository } from "../../../infra/database/repositories/Item";
import { PedidoItemRepository, PedidoRepository } from "../../../infra/database/repositories/Pedido";
import { Cliente } from "../../domain/entities/Cliente";
import { Item } from "../../domain/entities/Item";
import { Pedido, StatusPedido } from "../../domain/entities/Pedido";
import { PedidoItem } from "../../domain/entities/PedidoItem";
import { Preco } from "../../domain/valueobjects/Preco";
import { CadastrarPedidoDto } from "./CadastrarPedidoDto";

export class CadastrarPedidoUseCase {
    async execute(dto: CadastrarPedidoDto): Promise<Pedido> {
        const repPedido = AppDataSource.getRepository(PedidoRepository);
        const repCliente = AppDataSource.getRepository(ClienteRepository);
        const repItem = AppDataSource.getRepository(ItemRepository);
        const repPedidoItem = AppDataSource.getRepository(PedidoItemRepository);
        const pedido = new Pedido();

        console.log("Busca pedido")
        //Pesquisa se o pedido já existe
        if (dto.id !== undefined) {
            const pesq = await repPedido.findOne({where: {id: dto.id}, relations: ['cliente', 'pedidoItems'] });
            if (pesq) {
                if (pesq.cliente) {
                    pedido.cliente = new Cliente(pesq.cliente.id, pesq.cliente.nome);
                }
                const itens: PedidoItem[] = await Promise.all(
                    pesq.pedidoItems.map(async (itemDto) => {
                        const item = await repItem.findOneBy({ id: itemDto.id });
                        if (!item) {
                            throw new Error(`Item com ID ${itemDto.id} não encontrado.`);
                        }
                        return new PedidoItem(new Item(item.id, item.nome, item.descricao, new Preco(itemDto.preco), item.ingredientes, item.categoria), itemDto.quantidade);
                    })
                );
                itens.forEach(element => {
                    pedido.adicionarItem(element.item,element.quantidade.value);
                });
                console.log(pedido);
            }
        }
        console.log("Busca cliente")
        //Buscar cliente
        if (dto.cliente !== undefined) {
            const cliente = await repCliente.findOneBy({ id: dto.cliente });
            if (cliente) {
                pedido.cliente = new Cliente(cliente.id,cliente.nome);
            } else {
                throw new Error(`Cliente com ID ${dto.cliente} não encontrado.`);
            }
        }
        else {
            pedido.cliente = undefined;
        }
        console.log("Busca itens pelo ID")
        // Buscar itens pelo ID
        if (dto.itens) {
            const itens: PedidoItem[] = await Promise.all(
                dto.itens.map(async (itemDto) => {
                    const item = await repItem.findOneBy({ id: itemDto.itemId });
                    if (!item) {
                        throw new Error(`Item com ID ${itemDto.itemId} não encontrado.`);
                    }
                    return new PedidoItem(new Item(item.id, item.nome, item.descricao, new Preco(item.preco), item.ingredientes, item.categoria), itemDto.quantidade);
                })
            );
            //Elimina itens gravados no pedido que foram excluídos pelo cliente
            pedido.itens.forEach(element => {
                const itemEncontrado = itens.find(item => item.item.id == element.item.id);
                if (!itemEncontrado) {
                    pedido.eliminarItem(element.item.id);
                }
            });
            //Ajusta quantidades e valores dos itens escolhidos
            itens.forEach(element => {
                pedido.adicionarItem(element.item, element.quantidade.value);
            });
        }
        console.log("Pedido repository")
        let rep = new PedidoRepository();
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
        rep.status = pedido.status;
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
            repPedItem.quantidade = element.quantidade.value;
            rep.pedidoItems.push(repPedItem);
        });
        console.log(rep.pedidoItems);
        pedido.id = rep.id;
        await repPedidoItem.save(rep.pedidoItems);

        return pedido;
    }

    async atualizaPedido(id: number, status: string): Promise<boolean> {
        const repPedido = AppDataSource.getRepository(PedidoRepository);
        const pedido = await repPedido.findOneBy({ id: id });
        if (pedido) {
            const statusValido = StatusPedido[status.toUpperCase() as keyof typeof StatusPedido];
            if (statusValido) {
                pedido.status = statusValido;
                try {
                    repPedido.save(pedido);
                    if (statusValido == StatusPedido.ENVIAR_PARA_PAGAMENTO) {
                        //Inicia o status de pagamento
                    }
                    return true;
                }
                catch (error) {
                    return false;
                }
            }
            else {
                throw new Error('Status inválido');
            }
        }
        else {
            throw new Error('Pedido não encontrado');
        }
    }
}
