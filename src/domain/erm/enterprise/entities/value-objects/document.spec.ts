import { expect, test, describe } from 'vitest'

import { CPF } from '@/domain/erm/enterprise/entities/value-objects/cpf'
import { CNPJ } from '@/domain/erm/enterprise/entities/value-objects/cnpj'
import { Document } from '@/domain/erm/enterprise/entities/value-objects/document'

describe('Document', () => {
  test('should create a Document instance with valid CPF', () => {
    // const cpf = CPF.generateValidCPF()
    const cpf = '489.841.148-71'

    const document = Document.create(cpf)

    expect(document.getValue()).toBe('48984114871')
    expect(document.getType()).toBe('CPF')
    expect(document.isCPF()).toBe(true)
    expect(document.isCNPJ()).toBe(false)
  })

  test('should create a Document instance with valid CNPJ', () => {
    const cnpj = CNPJ.generateValidCNPJ()

    const document = Document.create(cnpj)

    expect(document.getValue()).toBe(cnpj)
    expect(document.getType()).toBe('CNPJ')
    expect(document.isCNPJ()).toBe(true)
    expect(document.isCPF()).toBe(false)
  })

  test('should throw an error for invalid document format', () => {
    const invalid = 'invalid-doc'

    expect(() => Document.create(invalid)).toThrow()
  })

  test('should throw if CPF is invalid even if length is 11', () => {
    const invalidCPF = '00000000000'

    expect(() => Document.create(invalidCPF)).toThrow()
  })

  test('should throw if CNPJ is invalid even if length is 14', () => {
    const invalidCNPJ = '00000000000000'

    expect(() => Document.create(invalidCNPJ)).toThrow()
  })
})
