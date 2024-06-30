export class Quantidade {
    private _value: number = 1;

    constructor(value: number) {
        this.alterarQuantidade(value);
    }

    get value(): number {
        return this._value;
    }

    alterarQuantidade(value: number) {
        if (value <= 0) {
            throw new Error('Quantidade não pode ser menor ou igual a zero');
        }
        this._value = value;
    }
}