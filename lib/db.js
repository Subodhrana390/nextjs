import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("localhost")
    ? false
    : { rejectUnauthorized: false },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export default pool;

export async function query(text, params) {
  try {
    const res = await pool.query(text, params);
    return res;
  } catch (err) {
    console.error("Database error:", err);
    throw err;
  }
}

export function rowToChallenge(row) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    difficulty: row.difficulty,
    language: row.language,
    timeLimit: row.time_limit,
    reward: row.reward,
    starterCode: row.starter_code,
    evaluationCriteria: row.evaluation_criteria,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
