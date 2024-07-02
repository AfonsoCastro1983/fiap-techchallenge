import { Body, Post, Get, Route, Tags, Put, Delete, Path } from "tsoa";
import { CadastrarItemUseCase } from "../../../application/usecases/item/CadastrarItemUseCase";
import { CadastrarItemDto } from "../../../domain/dtos/CadastrarItemDto";
import { Categoria } from "../../../shared/enums/Categoria";
import { ItemRepository } from "../../database/repositories/Item";
import { ListarItensUseCase } from "../../../application/usecases/item/ListarItensUseCase";

export interface ItemNovoRequest {
    nome: string;
    descricao: string;
    preco: number;
    ingredientes: string;
    categoria: string;
}

export interface ItemResponse {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    ingredientes: string;
    categoria: string;
}

export interface ItemModificarRequest extends ItemResponse{

}

export interface ItensArray {
    itens: Array<ItemRepository>;
}

@Route("item")
@Tags("Item")
export default class ItemController {
    private cadastrarItemUseCase: CadastrarItemUseCase;

    constructor(cadastrarItemUseCase: CadastrarItemUseCase) {
        this.cadastrarItemUseCase = cadastrarItemUseCase;
    }
    /**
     * Cadastro de um item no cardápio
     */
    @Post("/")
    public async salvarNovoItem(@Body() body: ItemNovoRequest): Promise<ItemResponse> {
        const dto: CadastrarItemDto = {
            nome: body.nome,
            descricao: body.descricao,
            preco: body.preco,
            ingredientes: body.ingredientes,
            categoria: Categoria[body.categoria.toUpperCase() as keyof typeof Categoria]
        }

        const item = await this.cadastrarItemUseCase.execute(dto);

        return {
            id: item.id,
            nome: item.nome,
            descricao: item.descricao,
            preco: item.preco.valor,
            ingredientes: item.ingredientes,
            categoria: item.categoria
        }
    }
    /**
     * Modificar um item do cardápio
     */
    @Put("/")
    public async editarItem(@Body() body: ItemModificarRequest): Promise<ItemResponse> {
        const dto: CadastrarItemDto = {
            id: body.id,
            nome: body.nome,
            descricao: body.descricao,
            preco: body.preco,
            ingredientes: body.ingredientes,
            categoria: Categoria[body.categoria.toUpperCase() as keyof typeof Categoria]
        }

        const item = await this.cadastrarItemUseCase.execute(dto);

        return {
            id: item.id,
            nome: item.nome,
            descricao: item.descricao,
            preco: item.preco.valor,
            ingredientes: item.ingredientes,
            categoria: item.categoria
        }
    }
    /**
     * Elimina o item escolhido
     * @param id identificador do item
     * @returns 
     * Verdadeiro se o item foi excluído ou falso se houve algum erro na excluão ou o item não existe
     */
    @Delete("/:id")
    public async eliminarItem(@Path() id: number): Promise<boolean> {
        const resposta = await this.cadastrarItemUseCase.delete(id);
        return resposta;
    }
    /**
     * Lista todos os itens por categoria
     * @param categoria 
     * @returns 
     */
    @Get("/:categoria")
    public async buscaItemPorCategoria(@Path() categoria: string): Promise<ItensArray> {
        const listaCategoria = new ListarItensUseCase();
        const itens = await listaCategoria.listarPorCategoria(categoria.toUpperCase());
        return {itens};
    }
}