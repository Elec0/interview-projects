'use server';

import { Quote } from '@/db/schema/quotes';
import { UnderwritingDetails } from '@/db/schema/underwritingDetails';
import logger from '@/logger';
import { redirect } from 'next/navigation';
import { dbClient, schema } from '../../../db/dbClient';
import { QuoteFormValues } from "./QuoteForm";

const calculatePremium = (underwritingDetails: UnderwritingDetails) => +underwritingDetails.numberCars * 50;
const calculateLimit = (underwritingDetails: UnderwritingDetails) => Math.min(+underwritingDetails.numberCars * 10000, 1e6);
const calculateDeductible = () => 5000;

export async function createQuote(formData: QuoteFormValues) {
    let quote: Quote;

    try {
        const [underwritingDetails] = await dbClient.insert(schema.underwritingDetails).values({
            firstName: formData.firstName,
            lastName: formData.lastName,
            addressLine1: formData.addressLine1,
            addressLine2: formData.addressLine2,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
            email: formData.email,
            numberCars: formData.numberCars
        }).returning();

        [quote] = await dbClient.insert(schema.quotes).values({
            underwritingDetailsId: underwritingDetails.id,
            premium: calculatePremium(underwritingDetails),
            limit: calculateLimit(underwritingDetails),
            deductible: calculateDeductible()
        }).returning();
    } catch (error) {
        logger.error({ event: 'QUOTE:CREATED:ERROR', message: (error as Error).message });
        throw error;
    }

    logger.info({ event: 'QUOTE:CREATED', quoteId: quote.id });

    return redirect(`/quotes/${ quote.id }/payment`);
}
