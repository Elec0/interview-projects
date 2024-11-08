import { dbClient, schema } from '@/db/dbClient';
import { QuoteFormValues } from './QuoteForm';
import {createQuote} from './actions';

describe('Server action: createQuote', () => {
    it('should persist underwriting details', async () => {
        const formData: QuoteFormValues = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            numberCars: 2,
            addressLine1: '123 Main St',
            addressLine2: '',
            city: 'Springfield',
            state: 'IL',
            zip: '62701',
        };

        try {
            await createQuote(formData);
        } catch (err) {
            // Catch the redirect
        }

        const underwritingDetails = await dbClient.select().from(schema.underwritingDetails);
        expect(underwritingDetails).toMatchSnapshot([{
            id: expect.any(String),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        }]);
    });

    it('should persist a quote', async () => {
        const formData: QuoteFormValues = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            numberCars: 2,
            addressLine1: '123 Main St',
            addressLine2: '',
            city: 'Springfield',
            state: 'IL',
            zip: '62701',
        };

        try {
            await createQuote(formData);
        } catch (err) {
            // Catch the redirect
        }

        const quote = await dbClient.select().from(schema.quotes);
        expect(quote).toMatchSnapshot([{
            id: expect.any(String),
            underwritingDetailsId: expect.any(String),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        }]);
    });

    it('should redirect to the payment page', async () => {
        const formData: QuoteFormValues = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            numberCars: 2,
            addressLine1: '123 Main St',
            addressLine2: '',
            city: 'Springfield',
            state: 'IL',
            zip: '62701',
        };

        try {
            await createQuote(formData);
        } catch (err) {
            return;
        }

        expect(1).toBe(2);
    })
});
