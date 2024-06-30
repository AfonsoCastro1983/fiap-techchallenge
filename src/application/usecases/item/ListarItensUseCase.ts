import { AppDataSource } from "../../../infra/database/data-source";
import { ItemRepository } from "../../../infra/database/repositories/Item";
import { Categoria } from "../../../shared/enums/Categoria";

export class ListarItensUseCase {
    async listarPorCategoria(categoria: string): Promise<Array<ItemRepository>> {
        const repItem = AppDataSource.getRepository(ItemRepository);
        const categoriaValida = Categoria[categoria as keyof typeof Categoria];
        if (categoriaValida) {
            const itens = await repItem.findBy({categoria: categoriaValida});
            return itens;
        }
        else {
            throw new Error('Categoria Inválida')
        }
    }
}