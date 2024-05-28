import { Body, Post, Get, Route, Tags, Path, Put } from "tsoa";
import { CadastrarPedidoDto } from "../../../core/usecases/pedido/CadastrarPedidoDto";
import { CadastrarPedidoUseCase } from "../../../core/usecases/pedido/CadastrarPedidoUseCase";
import { ListarPedidosUseCase } from "../../../core/usecases/pedido/ListarPedidoUseCase";
import { PedidoRepository } from "../../database/repositories/Pedido";

export interface PedidoRequest extends CadastrarPedidoDto {
}

export interface PedidoStatusRequest {
    id: number;
    status: string;
}

interface PedidoResponse {
    id: number;
    data: Date;
    status: string;
    cliente?: number;
    total: number;
    pedidoItems: { itemId: number, preco: number; quantidade: number }[];
}

interface Pedidos {
    pedidos: Array<PedidoResponse>;
}

@Route("pedido")
@Tags("Pedido")
export default class PedidoController {
    private cadastrarPedidoUseCase: CadastrarPedidoUseCase;

    constructor(cadastrarPedidoUseCase: CadastrarPedidoUseCase) {
        this.cadastrarPedidoUseCase = cadastrarPedidoUseCase;
    }

    private formataResposta(pedidos: Array<PedidoRepository>) {
        if (!pedidos || pedidos.length === 0) {
            throw new Error("Pedido não encontrado");
        }

        console.log(pedidos);

        const pedidosResponse: PedidoResponse[] = pedidos.map(pedido => ({
            id: pedido.id,
            data: pedido.data,
            status: pedido.status,
            cliente: pedido.cliente === undefined || pedido.cliente === null ? 0 : pedido.cliente.id,
            total: pedido.total,
            pedidoItems: pedido.pedidoItems === undefined ? [] : pedido.pedidoItems.map(item => ({
                itemId: item.id,
                preco: item.preco,
                quantidade: item.quantidade
            }))
        }));
        return pedidosResponse;
    }
    /**
     * Busca um pedido específico
     * @param id identificador do pedido
     * @returns 
     * Lista de pedidos encontrados
     */
    @Get("/:id")
    public async buscaPorId(@Path() id: number): Promise<Pedidos> {
        const listaPedidos = new ListarPedidosUseCase();
        const pedidos = await listaPedidos.buscaPorID(id);

        const pedidosResponse: PedidoResponse[] = this.formataResposta(pedidos);

        return { pedidos: pedidosResponse };
    }
    /**
     * Busca pedidos por um status
     * @param status status do pedido
     * @returns 
     * Lista de pedidos encontrados
     */
    @Get("/:status")
    public async buscaPorStatus(@Path() status: string): Promise<Pedidos> {
        const listaPedidos = new ListarPedidosUseCase();
        const pedidos = await listaPedidos.buscaPorStatus(status);

        const pedidosResponse: PedidoResponse[] = this.formataResposta(pedidos);

        return { pedidos: pedidosResponse };
    }
    /**
     * Cadastrar pedido
     */
    @Post("/")
    public async cadastrarPedido(@Body() body: PedidoRequest): Promise<PedidoResponse> {
        const dto: CadastrarPedidoDto = {
            id: body.id,
            cliente: body.cliente,
            itens: body.itens,
            status: body.status,
        }
        
        const pedido = await this.cadastrarPedidoUseCase.execute(dto);
        console.log(pedido);

        const pedidoResponse: PedidoResponse = {
            id: pedido.id,
            data: pedido.dataCriacao,
            status: pedido.status,
            cliente: pedido.cliente === undefined ? 0 : pedido.cliente.id,
            total: pedido.valorTotal.valor,
            pedidoItems: pedido.itens.map(item => ({
                itemId: item.item.id,
                preco: item.item.preco.valor,
                quantidade: item.quantidade.value
            }))
        };

        return pedidoResponse;
    }
    /**
     * Atualizar status de um pedido
     * @param body 
     * @returns 
     */
    @Put("/status")
    public async atualizarStatusPedido(@Body() body: PedidoStatusRequest): Promise<boolean> {
        const resposta = await this.cadastrarPedidoUseCase.atualizaPedido(body.id,body.status);
        return resposta;
    }
}