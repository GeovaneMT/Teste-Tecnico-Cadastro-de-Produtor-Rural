export class CNPJ {
  public value: string;

  private constructor(value: string) {
    if (!this.isValid(value)) {
      throw new Error('Invalid CNPJ');
    }
    this.value = value;
  }

  static create(value: string) {
    return new CNPJ(value)
  }

  private isValid(cnpj: string): boolean {
    const regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/; // simple regex for format validation
    return regex.test(cnpj);
  }

  getValue(): string {
    return this.value;
  }
}
