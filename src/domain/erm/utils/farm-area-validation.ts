import { z } from 'zod'

const cleanNumber = (value: string) => value.replace(/\D/g, '')

export const farmAreaValidationSchema = z
  .object({

    farmArea: z
      .union([z.string(), z.number()])
      .transform((val) => Number(cleanNumber(String(val))))
      .refine((val) => !isNaN(val) && val >= 0, {
        message: 'Total area must be a valid and positive number',
      }),

    vegetationArea: z
      .union([z.string(), z.number()])
      .transform((val) => Number(cleanNumber(String(val))))
      .refine((val) => !isNaN(val) && val >= 0, {
        message: 'Vegetation area must be a valid and positive number',
      }),

    agriculturalArea: z
      .union([z.string(), z.number()])
      .transform((val) => Number(cleanNumber(String(val))))
      .refine((val) => !isNaN(val) && val >= 0, {
        message: 'Agricultural area must be a valid and positive number',
      }),
  })
  .refine(
    (data) => {
      return data.vegetationArea + data.agriculturalArea <= data.farmArea
    },
    {
      message:
        'The sum of agricultural and vegetation areas cannot be greater than the total farm area',
      path: ['farmArea'], // or ['vegetationArea'] or none if you want generic
    },
  )

export type ValidateFarmDto = z.infer<typeof farmAreaValidationSchema>
