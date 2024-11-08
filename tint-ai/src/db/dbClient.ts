import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { quotes } from './schema/quotes';
import { underwritingDetails } from './schema/underwritingDetails';
import { databaseConfig } from './databaseConfig';
import { policies } from "./schema/policies";

const pool = new Pool(databaseConfig);

export const schema = {
    quotes,
    underwritingDetails,
    policies
};

export const dbClient = drizzle(pool, {
    schema,
});
