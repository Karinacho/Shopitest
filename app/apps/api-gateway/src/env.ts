import dotenv from 'dotenv';

import { z } from 'zod';

const stage = process.env.APP_STAGE ?? 'dev';

// Load the correct .env file based on APP_STAGE
const result = dotenv.config({ path: `.env.${stage}` });

if (result.error) {
  dotenv.config({ path: `.env}` });
}


const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  APP_STAGE: z.enum(['dev', 'production', 'test']).default('dev'),
  PORT: z.coerce.number().positive().default(8080),
  // DATABASE_URL: z.string().startsWith('postgresql://'),
  // JWT_SECRET: z.string().min(32, 'Must be 32 chars long'),
  // JWT_EXPIRES_IN: z.string().default('7d'),
  // BCRYPT_ROUNDS: z.coerce.number().min(10).max(20).default(12)
})

export type Env = z.infer<typeof envSchema>;
let env: Env;

try {
  env = envSchema.parse(process.env)
  } catch (e) {
    if (e instanceof z.ZodError) {
      console.log('Invalid env variables');
      console.error(JSON.stringify(e.issues, null, 2));

    e.issues.forEach(err => {
      const path = err.path.join('.')
      console.log(`[${path}: ${err.message}`);
    })

    process.exit(1);
  }

  throw e;
}

export const isProd = () => env.APP_STAGE === 'production';
export const isDev = () => env.APP_STAGE === 'dev';
export const isTest = () => env.APP_STAGE === 'test';

export { env };
export default env;
