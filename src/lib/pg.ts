// lib/db.ts
import { Pool, QueryResultRow } from "pg";

let instance: Database | null = null;

class Database {
  private pool: Pool;

  private constructor() {
    this.pool = new Pool({
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      port: Number(process.env.PG_PORT),
      ssl: true,
    });
  }

  public static getInstance(): Database {
    if (!instance) {
      instance = new Database();
    }
    return instance;
  }

  public async query<T extends QueryResultRow>(text: string): Promise<T[]> {
    const client = await this.pool.connect();
    try {
      const result = await client.query<T>(text, []);
      return result.rows;
    } finally {
      client.release();
    }
  }
}

export default Database.getInstance();
