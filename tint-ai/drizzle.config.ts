import type { Config } from 'drizzle-kit';

import { databaseConfig } from '@/db/databaseConfig';

export default {
    schema: './src/db/schema/*.ts',
    out: './src/db/migrations',
    driver: 'pg',
    dbCredentials: databaseConfig
} satisfies Config;
