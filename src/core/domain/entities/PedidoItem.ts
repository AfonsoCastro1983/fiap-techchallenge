import { Preco } from "../valueobjects/Preco";
import { Quantidade } from "../valueobjects/Quantidade";
import { Item } from "./Item";

export class PedidoItem {
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
        return new Preco(this._item.preco.valor * this._quantidade.value);
    }

    alterarQuantidade(quantidade: number) {
        this._quantidade.alterarQuantidade(quantidade);
    }
}