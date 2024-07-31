import { Preco } from "../../../shared/valueobjects/Preco";
import { Quantidade } from "../../../shared/valueobjects/Quantidade";
import { IItem } from "../item/IItem";

export interface IPedidoItem {
    item: IItem,
    quantidade: Quantidade,
    total: Preco
}