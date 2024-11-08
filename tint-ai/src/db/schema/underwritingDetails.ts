import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const underwritingDetails = pgTable('underwriting_details', {
    id: uuid('id').primaryKey().defaultRandom(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    email: text('email').notNull(),
    numberCars: integer('number_cars').notNull(),
    addressLine1: text('address_line_1').notNull(),
    addressLine2: text('address_line_2'),
    city: text('city').notNull(),
    state: text('state').notNull(),
    zip: text('zip').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export type UnderwritingDetails = typeof underwritingDetails.$inferSelect;