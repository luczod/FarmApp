import { Pool } from "pg";

// env
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbname = process.env.DB_NAME;

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: dbname,
  user: dbUser,
  password: dbPass,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

async function clearCache() {
  await pool.end(); // close all connections in the pool
}
// clearCache();

export default pool;
