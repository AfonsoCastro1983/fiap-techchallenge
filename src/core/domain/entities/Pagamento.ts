import { Preco } from "../valueobjects/Preco";

// Definição do enum para o campo status
export enum StatusPagamento {
    PAGO = 'Pago',
    AGUARDANDO_RESPOSTA = 'Aguardando Resposta',
    CANCELADO = 'Cancelado',
}

export class Pagamento {
  private _id: number;
  private _valor: Preco;
  private _status: StatusPagamento;
  private _dataCriacao: Date;

  constructor(id: number, valor: Preco) {
    this._id = id;
    this._valor = valor;
    this._status = StatusPagamento.AGUARDANDO_RESPOSTA;
    this._dataCriacao = new Date();
  }

  get id(): number {
    return this._id;
  }

  get valor(): Preco {
    return this._valor;
  }

  get status(): StatusPagamento {
    return this._status;
  }

  set status(value: StatusPagamento) {
    this._status = value;
  }

  get dataCriacao(): Date {
    return this._dataCriacao;
  }

  confirmarPagamento(): void {
    this._status = StatusPagamento.PAGO;
  }

  cancelarPagamento(): void {
    this._status = StatusPagamento.CANCELADO;
  }
}