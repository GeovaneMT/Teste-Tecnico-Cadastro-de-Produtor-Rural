import { expect, test } from 'vitest'
import { CNPJ } from '@/domain/erm/enterprise/entities/value-objects/cnpj'

test('it should be able to create a valid CNPJ', () => {
  
  const validCNPJ = CNPJ.create('123.456.789-00')
  
  expect(validCNPJ.getDocument()).toBe('123.456.789-00')
})