import { z } from "zod";

const cleanNumber = (value: string) => value.replace(/\D/g, "");

function isValidCPF(cpf: string): boolean {
  cpf = cleanNumber(cpf);
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  const calcCheckDigit = (base: string, factor: number) =>
    String(
      ((base.split("").reduce((sum, num, idx) => sum + parseInt(num) * (factor - idx), 0) * 10) % 11) % 10
    );

  const check1 = calcCheckDigit(cpf.slice(0, 9), 10);
  const check2 = calcCheckDigit(cpf.slice(0, 10), 11);

  return check1 === cpf[9] && check2 === cpf[10];
}

function isValidCNPJ(cnpj: string): boolean {
  cnpj = cleanNumber(cnpj);
  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

  const calcCheckDigit = (base: string, weights: number[]) => {
    const sum = base.split("").reduce((acc, num, idx) => acc + parseInt(num) * weights[idx], 0);
    const rest = sum % 11;
    return rest < 2 ? "0" : String(11 - rest);
  };

  const base = cnpj.slice(0, 12);
  const digit1 = calcCheckDigit(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const digit2 = calcCheckDigit(base + digit1, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

  return digit1 === cnpj[12] && digit2 === cnpj[13];
}

export const documentValidationSchema = z.object({
  document: z
    .string()
    .transform((value) => cleanNumber(value))
    .refine((value) => value.length === 11 || value.length === 14, {
      message: "CPF or CNPJ must contain 11 or 14 digits",
    })
    .refine((value) => (value.length === 11 ? isValidCPF(value) : value.length === 14 && isValidCNPJ(value)), {
      message: "Invalid CPF or CNPJ",
    }),
})

export type ValidateDocumentDto = z.infer<typeof documentValidationSchema>