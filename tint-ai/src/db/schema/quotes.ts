import { integer, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { underwritingDetails } from './underwritingDetails';

export const quotes = pgTable('quotes', {
    id: uuid('id').primaryKey().defaultRandom(),
    premium: integer('premium'),
    limit: integer('limit'),
    deductible: integer('deductible'),
    underwritingDetailsId: uuid('underwriting_details_id').references(() => underwritingDetails.id, { onDelete: 'cascade' }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export type Quote = typeof quotes.$inferSelect;