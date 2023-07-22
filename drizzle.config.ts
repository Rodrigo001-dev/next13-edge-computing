import type { Config } from 'drizzle-kit'
import * as dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config({ path: './.env' })

const databaseUrl = z.string().url().parse(process.env.DATABASE_URL)

export default {
  schema: './src/db/schema/*',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: databaseUrl,
  },
} satisfies Config
