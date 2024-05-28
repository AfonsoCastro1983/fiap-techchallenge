import { Preco } from '../valueobjects/Preco';

// Definição do enum para o campo categoria
export enum Categoria {
    LANCHE = 'Lanche',
    BEBIDA = 'Bebida',
    ACOMPANHAMENTO = 'Acompanhamento',
    SOBREMESA = 'Sobremesa'
}

export class Item {
  private _id: number;
  private _nome: string;
  private _descricao: string;
  private _preco: Preco;
  private _ingredientes: string;
  private _categoria: Categoria;

  constructor(
    id: number,
    nome: string,
    descricao: string,
    preco: Preco,
    ingredientes: string,
    categoria: Categoria
  ) {
    this._id = id;
    this._nome = nome;
    this._descricao = descricao;
    this._preco = preco;
    this._ingredientes = ingredientes;
    this._categoria = categoria;
  }

  get id(): number {
    return this._id;
  }

  get nome(): string {
    return this._nome;
  }

  get descricao(): string {
    return this._descricao;
  }

  get preco(): Preco {
    return this._preco;
  }

  set preco(value: Preco) {
    this._preco = value;
  }

  get ingredientes(): string {
    return this._ingredientes;
  }

  get categoria(): Categoria {
    return this._categoria;
  }
}