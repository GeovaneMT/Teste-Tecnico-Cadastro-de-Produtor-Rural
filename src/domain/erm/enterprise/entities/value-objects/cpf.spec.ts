import { expect, test } from 'vitest'
import { CPF } from '@/domain/erm/enterprise/entities/value-objects/cpf'

test('it should be able to create a valid CPF', () => {
  
  const validCPF = CPF.create('123.456.789-00')
  
  expect(validCPF.getDocument()).toBe('123.456.789-00')
})