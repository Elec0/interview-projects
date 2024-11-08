import 'dotenv/config';
import path from 'path';

import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';

import { databaseConfig } from './databaseConfig';
import { schema } from './dbClient';

export const migrateDb = async () => {
    const pool = new Pool({
        ...databaseConfig,
        max: 1, // Drizzle recommend setting max to 1 for migrations see https://orm.drizzle.team/docs/get-started-postgresql#node-postgres
    });

    const db = drizzle(pool, { schema });
    await migrate(db, {
        migrationsFolder: path.resolve(__dirname, './migrations'),
        migrationsTable: 'drizzle_migrations',
    });

    await pool.end();
};
