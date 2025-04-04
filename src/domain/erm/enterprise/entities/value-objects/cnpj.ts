export class CNPJ {
  private document: string

  private constructor(document: string) {
    this.document = document
  }

  static create(value: string) {
    return new CNPJ(value)
  }

  static generateValidCNPJ(): string {
    const base = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).concat([0, 0, 0, 1]);
  
    const calcCheckDigit = (numbers: number[], weights: number[]) => {
      const sum = numbers.reduce((acc, digit, idx) => acc + digit * weights[idx], 0);
      const rest = sum % 11;
      return rest < 2 ? 0 : 11 - rest;
    };
  
    const digit1 = calcCheckDigit(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
    const digit2 = calcCheckDigit([...base, digit1], [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  
    return [...base, digit1, digit2].join('');
  }
  
  getDocument(): string {
    return this.document
  }
  
}
