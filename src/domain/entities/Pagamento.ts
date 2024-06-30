import { Preco } from "../../shared/valueobjects/Preco";
import { StatusPagamento } from "../../shared/enums/StatusPagamento";

export class Pagamento {
  private _id: number;
  private _valor: Preco;
  private _status: StatusPagamento;
  private _dataCriacao: Date;
  private _identificador_pedido: string;
  private _qrCodeCodigo: string;

  constructor(id: number, valor: Preco) {
    this._id = id;
    this._valor = valor;
    this._status = StatusPagamento.AGUARDANDO_RESPOSTA;
    this._dataCriacao = new Date();
    this._identificador_pedido = "";
    this._qrCodeCodigo = "";
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

  set identificadorPedido(value: string) {
    this._identificador_pedido = value;
  }

  get identificadorPedido(): string {
    return this._identificador_pedido;
  }

  set qrCode(value: string) {
    this._qrCodeCodigo = value;
  }

  get qrCode(): string {
    return this._qrCodeCodigo;
  }

  confirmarPagamento(): void {
    this._status = StatusPagamento.PAGO;
  }

  cancelarPagamento(): void {
    this._status = StatusPagamento.CANCELADO;
  }
}