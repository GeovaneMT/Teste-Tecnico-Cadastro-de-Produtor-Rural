export class CPF {
  private value: string;

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new Error('Invalid CPF');
    }
    this.value = value;
  }

  private isValid(cpf: string): boolean {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/; // simple regex for format validation
    return regex.test(cpf);
  }

  getValue(): string {
    return this.value;
  }
}
