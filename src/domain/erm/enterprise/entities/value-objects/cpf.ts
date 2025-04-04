export class CPF {
  private document: string

  private constructor(document: string) {
    this.document = document
  }

  static create(value: string) {
    return new CPF(value)
  }

  static generateValidCPF(): string {
    const randomDigits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
    
    const calcCheckDigit = (base: number[], factor: number) => {
      const total = base.reduce((sum, digit, index) => sum + digit * (factor - index), 0);
      const remainder = (total * 10) % 11;
      return remainder === 10 ? 0 : remainder;
    };
  
    const digit1 = calcCheckDigit(randomDigits, 10);
    const digit2 = calcCheckDigit([...randomDigits, digit1], 11);
  
    return [...randomDigits, digit1, digit2].join('');
  }
  
  getDocument(): string {
    return this.document
  }
  
}
