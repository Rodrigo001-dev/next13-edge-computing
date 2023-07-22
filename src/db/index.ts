import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'

const client = new Client({
  host: '0.0.0.0',
  port: 5433,
  user: 'next13-drizzle',
  password: 'secret',
  database: 'database-next13-with-drizzle',
})

await client.connect()

export const db = drizzle(client)
