import { IPedidoItem } from "../../application/interfaces/pedido/IPedidoItem";
import { Preco } from "../../shared/valueobjects/Preco";
import { Quantidade } from "../../shared/valueobjects/Quantidade";
import { Item } from "./Item";

export class PedidoItem implements IPedidoItem{
    private _item: Item;
    private _quantidade: Quantidade;

    constructor(item: Item, quantidade: number) {
        this._item = item;
        this._quantidade = new Quantidade(quantidade);
    }

    get item(): Item {
        return this._item;
    }

    get quantidade(): Quantidade {
        return this._quantidade;
    }

    get total(): Preco {
        return new Preco(this._item.preco.valor * this._quantidade.valor);
    }

    alterarQuantidade(quantidade: number) {
        this._quantidade.alterarQuantidade(quantidade);
    }
}