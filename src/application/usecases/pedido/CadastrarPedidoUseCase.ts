import { AppDataSource } from "../../../infra/database/data-source";
import { Cliente } from "../../../domain/entities/Cliente";
import { Item } from "../../../domain/entities/Item";
import { Pedido } from "../../../domain/entities/Pedido";
import { StatusPedido } from "../../../shared/enums/StatusPedido";
import { Preco } from "../../../shared/valueobjects/Preco";
import { CadastrarPedidoDto } from "../../../domain/dtos/CadastrarPedidoDto";
import { IPedidoGateway } from "../../interfaces/pedido/IPedidoGateway";
import { Categoria } from "../../../shared/enums/Categoria";
import { IPedido } from "../../interfaces/pedido/IPedido";

export class CadastrarPedidoUseCase {
    private pedidoGateway: IPedidoGateway;

    constructor(pedidoGateway: IPedidoGateway) {
        this.pedidoGateway = pedidoGateway;
    }


    async execute(dto: CadastrarPedidoDto): Promise<IPedido> {
        const pedido = new Pedido();
        if (dto.cliente) {
            pedido.cliente = new Cliente(dto.cliente, "");
        }
        if (dto.id) {
            pedido.id = dto.id;
        }        
        pedido.atualizarStatus( dto.status );
        if (!dto.itens) {
            throw new Error('Pedido sem itens');
        }

        dto.itens.forEach(element => {
            pedido.adicionarItem(new Item(element.itemId,'','',new Preco(element.preco),'',Categoria.LANCHE),element.quantidade);
        });

        console.log('Pedido para gravação:',pedido);

        return await this.pedidoGateway.criarPedido(pedido);
    }

    async atualizaPedido(id: number, status: string): Promise<boolean> {
        const status_valido = StatusPedido[status.toUpperCase() as keyof typeof StatusPedido];
        const pedido = await this.pedidoGateway.atualizaStatusPedido(id,status_valido);
        console.log(pedido.status,status_valido.toString());
        return pedido.status == status_valido.toString();
        /*const repPedido = AppDataSource.getRepository(PedidoRepository);
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
        }*/
    }
}
