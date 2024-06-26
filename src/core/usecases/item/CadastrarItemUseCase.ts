import { AppDataSource } from "../../../infra/database/data-source";
import { ItemRepository } from "../../../infra/database/repositories/Item";
import { Categoria, Item } from "../../domain/entities/Item";
import { Preco } from "../../domain/valueobjects/Preco";
import { CadastrarItemDto } from "./CadastrarItemDto";

export class CadastrarItemUseCase {
    async execute(dto: CadastrarItemDto): Promise<Item> {
        const preco = new Preco(dto.preco);

        const repItem = AppDataSource.getRepository(ItemRepository);
        let rep = new ItemRepository();

        if (dto.id) {
            const pesq = await repItem.findOneBy({ id: dto.id });
            if (pesq) {
                rep = pesq;
            }
        }
        rep.nome = dto.nome;
        rep.descricao = dto.descricao;
        rep.preco = preco.valor;
        rep.ingredientes = dto.ingredientes;
        rep.categoria = dto.categoria;
        const novo = await repItem.save(rep);
        rep = novo;

        const item = new Item(rep.id, rep.nome, rep.descricao, preco, rep.ingredientes, rep.categoria);
        return item;
    }

    async get(id: number): Promise<Item> {
        const repItem = AppDataSource.getRepository(ItemRepository);
        const pesq = await repItem.findOneBy({ id: id });
        let item : Item;
        if (pesq) {
            item = new Item(pesq.id, pesq.nome, pesq.descricao, new Preco(pesq.preco), pesq.ingredientes, pesq.categoria);
        }
        else {
            item = new Item(0, "", "", new Preco(0), "", Categoria.LANCHE);
        }
        return item;
    }

    async delete(index: number): Promise<boolean> {
        const repItem = AppDataSource.getRepository(ItemRepository);
        const pesq = await repItem.findOneBy({ id: index });
        if (pesq) {
            try {
                repItem.remove(pesq);
                return true;
            }
            catch (error) {
                return false;
            }
        }
        else {
            throw new Error('Registro não encontrado');
        }
    }
}