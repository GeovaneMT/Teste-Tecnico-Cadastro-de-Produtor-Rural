import { expect, test } from 'vitest';
import { CPF } from '@/domain/erm/enterprise/entities/value-objects/cpf';

test('it should be able to create a valid CPF', () => {
  
  const validCPF = CPF.create('123.456.789-00');
  
  expect(validCPF.getValue()).toBe('123.456.789-00');
});

test('it should throw an error for an invalid CPF', () => {
  expect(() => CPF.create('123.456.78X-00')).toThrowError('Invalid CPF');
});

test('it should throw an error for a CPF with wrong format', () => {
  expect(() => CPF.create('12345678900')).toThrowError('Invalid CPF');
});
