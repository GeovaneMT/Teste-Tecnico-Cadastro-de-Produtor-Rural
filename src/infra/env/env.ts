import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  JWT_EXPIRES_IN: z.string(),
  JWT_REFRESH_TOKEN_EXPIRES_IN: z.string(),

  REDIS_HOST: z.string().optional().default('127.0.0.1'),
  REDIS_PORT: z.coerce.number().optional().default(6379),
  REDIS_DB: z.coerce.number().optional().default(0),

  PORT: z.coerce.number().optional().default(3333),
})

export type Env = z.infer<typeof envSchema>