import { CPF } from "@/domain/erm/enterprise/entities/value-objects/cpf"
import { CNPJ } from "@/domain/erm/enterprise/entities/value-objects/cnpj"
import { documentValidationSchema } from "@/domain/erm/utils/document-validation"

export class Document {
  private value: string
  private type: "CPF" | "CNPJ"

  private constructor(value: string, type: "CPF" | "CNPJ") {
    this.value = value
    this.type = type
  }

  static create(value: string): Document {
    const result = documentValidationSchema.safeParse({ document: value })

    if (!result.success) {
      throw new Error(result.error.errors[0].message)
    }

    const cleaned = result.data.document

    if (cleaned.length === 11) {
      CPF.create(cleaned)
      return new Document(cleaned, "CPF")
    }
    
    if (cleaned.length === 14) {
      CNPJ.create(cleaned)
      return new Document(cleaned, "CNPJ")
    }
    
    throw new Error("CPF must have 11 digits or CNPJ must have 14 digits")
  }
  
  static generateValidDocument(): Document {
    const fakecpf = CPF.generateValidCPF()
    const fakecnpj = CNPJ.generateValidCNPJ() 
    const fakedoc = Math.random() < 0.5 ? fakecpf : fakecnpj
    return this.create(fakedoc)
  }

  getValue(): string {
    return this.value
  }

  getType(): "CPF" | "CNPJ" {
    return this.type
  }

  isCPF(): boolean {
    return this.type === "CPF"
  }

  isCNPJ(): boolean {
    return this.type === "CNPJ"
  }
}
