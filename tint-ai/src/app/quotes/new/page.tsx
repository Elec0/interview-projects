import { QuoteForm } from './QuoteForm';

export type QuoteFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    numberCars: number;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zip: string;
  };

export default async function NewQuotePage() {
    return (
        <div className="page">
            <h2>Get a Quote</h2>
            <QuoteForm />
        </div>
    );
}
