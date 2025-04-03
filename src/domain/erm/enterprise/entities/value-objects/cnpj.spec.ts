import { expect, test } from 'vitest';
import { CNPJ } from '@/domain/erm/enterprise/entities/value-objects/cnpj';

test('it should be able to create a valid CNPJ', () => {
  
  const validCNPJ = CNPJ.create('12.345.678/0001-95');
  
  expect(validCNPJ.getValue()).toBe('12.345.678/0001-95');
});

test('it should throw an error for an invalid CNPJ', () => {
  expect(() => CNPJ.create('12.345.678/0001-9X')).toThrowError('Invalid CNPJ');
});

test('it should throw an error for a CNPJ with wrong format', () => {
  expect(() => CNPJ.create('12345678000190')).toThrowError('Invalid CNPJ');
});
