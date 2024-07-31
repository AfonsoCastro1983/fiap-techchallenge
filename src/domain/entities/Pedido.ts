import { Item } from './Item';
import { Cliente } from './Cliente';
import { Preco } from '../../shared/valueobjects/Preco';
import { PedidoItem } from './PedidoItem';
import { StatusPedido } from '../../shared/enums/StatusPedido';
import { IPedido } from '../../application/interfaces/pedido/IPedido';

export class Pedido implements IPedido {
    private _id: number = 0;
    private _cliente?: Cliente;
    private _itens: PedidoItem[] = [];
    private _status: StatusPedido;
    private _valorTotal: Preco;
    private _dataCriacao: Date;

    constructor() {
        this._status = StatusPedido.NOVO;
        this._valorTotal = new Preco(0);
        this.atualizarValorTotal(this._itens);
        this._dataCriacao = new Date();
    }

    private atualizarValorTotal(itens: PedidoItem[]) {
        this._valorTotal = itens.reduce(
            (total, item) => total.somar(item.total),
            new Preco(0)
        );
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get cliente(): Cliente | undefined {
        return this._cliente;
    }

    set cliente(value: Cliente | undefined) {
        this._cliente = value;
    }

    get itens(): PedidoItem[] {
        return this._itens;
    }

    get status(): StatusPedido {
        return this._status;
    }

    get valorTotal(): Preco {
        return this._valorTotal;
    }

    get data(): Date {
        return this._dataCriacao;
    }

    set data(value: Date) {
        this._dataCriacao = value;
    }

    atualizarStatus(novoStatus: StatusPedido): void {
        this._status = novoStatus;
    }

    adicionarItem(itemAdicionado: Item, quantidade: number): void {
        const itemEncontrado = this._itens.find(it => it.item.id == itemAdicionado.id);
        //Atualizar o item    
        if (itemEncontrado) {
            itemEncontrado.alterarQuantidade(quantidade);
        }
        else {
            const novoItem: PedidoItem = new PedidoItem(itemAdicionado, quantidade);
            this._itens.push(novoItem);
        }
        //Atualizar total
        this.atualizarValorTotal(this._itens);
    }

    eliminarItem(idItem: number): void {
        this._itens = this._itens.filter(item => item.item.id !== idItem );
        this.atualizarValorTotal(this._itens);
    }
}