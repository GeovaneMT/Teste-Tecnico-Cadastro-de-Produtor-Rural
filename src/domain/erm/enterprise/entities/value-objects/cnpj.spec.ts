import { expect, test } from 'vitest';
import { CNPJ } from '@/domain/erm/enterprise/entities/value-objects/cnpj';

test('it should be able to create a valid CNPJ', () => {
  const validCNPJ = new CNPJ('12.345.678/0001-90');
  
  expect(validCNPJ.getValue()).toBe('12.345.678/0001-90');
});

test('it should throw an error for an invalid CNPJ', () => {
  expect(() => new CNPJ('12.345.678/0001-9X')).toThrowError('Invalid CNPJ');
});

test('it should throw an error for a CNPJ with wrong format', () => {
  expect(() => new CNPJ('12345678000190')).toThrowError('Invalid CNPJ');
});
