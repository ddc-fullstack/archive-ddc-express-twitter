import { createPool, Pool } from 'mysql2/promise';
require('dotenv').config();

// Database connection. Can use config from .env file (based on example.env) or the defaults

export async function connect (): Promise<Pool> {
  const connection = await createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    namedPlaceholders: true
  });
  return connection;
}
