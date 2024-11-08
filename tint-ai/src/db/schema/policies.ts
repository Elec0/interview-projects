import { integer, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { underwritingDetails } from "./underwritingDetails";

export const policies = pgTable('policies', {
    id: uuid('id').primaryKey().defaultRandom(),
    premium: integer('premium'),
    limit: integer('limit'),
    deductible: integer('deductible'),
    quoteId: uuid('quote_id').notNull(),
    underwritingDetailsId: uuid('underwriting_details_id').references(() => underwritingDetails.id, { onDelete: 'cascade' }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export type Policy = typeof policies.$inferSelect;