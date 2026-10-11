import { Pool } from 'pg'

const rawConnectionString = process.env.POSTGRES_URL_NON_POOLING ?? process.env.POSTGRES_URL
const connectionUrl = rawConnectionString ? new URL(rawConnectionString) : null
connectionUrl?.searchParams.delete('sslmode')
connectionUrl?.searchParams.delete('uselibpqcompat')

export const pool = new Pool({
  connectionString: connectionUrl?.toString(),
  ssl: { rejectUnauthorized: false },
})
