export class CPF {
    private _value: string;
  
    constructor(value: string) {
      this.validate(value);
      this._value = value;
    }
  
    get value(): string {
      return this._value;
    }
  
    private validate(value: string): void {
      if (!value || !this.isValidCPF(value)) {
        throw new Error('CPF inválido');
      }
    }
  
    private isValidCPF(cpf: string): boolean {
      cpf = cpf.replace(/[^0-9]/g, ''); // Remove caracteres não numéricos
      if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) { // CPF inválido
        return false;
      }
      let sum = 0;
      for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
      }
      let remainder = (sum % 11) % 10;
      if (remainder !== parseInt(cpf.charAt(9))) {
        return false;
      }
      sum = 0;
      for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
      }
      remainder = (sum % 11) % 10;
      if (remainder !== parseInt(cpf.charAt(10))) {
        return false;
      }
      return true;
    }
  }