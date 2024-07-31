import { Email } from "../../shared/valueobjects/Email";
import { CPF } from "../../shared/valueobjects/CPF";
import { ICliente } from "../../application/interfaces/cliente/ICliente";

export class Cliente implements ICliente {
  private _id: number;
  private _nome: string;
  private _email?: Email;
  private _cpf?: CPF;

  constructor(id: number, nome: string, email?: Email, cpf?: CPF) {
    this._id = id;
    this._nome = nome;
    this._email = email;
    this._cpf = cpf;
  }

  get id(): number {
    return this._id;
  }

  get nome(): string {
    return this._nome;
  }

  get email(): Email | undefined {
    return this._email;
  }

  get cpf(): CPF | undefined {
    return this._cpf;
  }

  setEmail(email: Email): void {
    this._email = email;
  }

  setCpf(cpf: CPF): void {
    this._cpf = cpf;
  }
}