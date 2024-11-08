import { dbClient, schema } from "@/db/dbClient";
import { quotes } from '@/db/schema/quotes';
import logger from '@/logger';
import { eq } from 'drizzle-orm';

export async function fetchQuote(id: string | unknown) {
    if (typeof id !== 'string') {
        throw new Error('Invalid quote id');
    }
    return await getQuote(id);
}

async function getQuote(id: string) {
    return (await dbClient.select().from(quotes).where(eq(quotes.id, id)).limit(1)).at(0);
}

export async function convertQuoteToPolicy(quoteId: string) {
    if (!quoteId) {
        throw new Error('Invalid quote id');
    }
    const quote = await getQuote(quoteId);

    if (!quote) {
        throw new Error('Quote not found');
    }

    const policy = await dbClient.insert(schema.policies).values({
        underwritingDetailsId: quote.underwritingDetailsId,
        quoteId: quote.id,
        premium: quote.premium,
        limit: quote.limit,
        deductible: quote.deductible
    }).returning();

    return policy;
}

/**
 * TODO: Use Datadog to alert the team when a payment fails
 * @param quoteId 
 */
export async function alertFailedPayment(quoteId: string) {
    logger.error({ event: 'PAYMENT:FAILED', quoteId });
    return;
}
