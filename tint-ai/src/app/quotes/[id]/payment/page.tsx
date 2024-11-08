import { fetchQuote } from "@/common/common";
import { Suspense } from "react";

export default function PreviewPage(props: { params: { id: string } }) {
    const id = props.params.id as string;    

    return (
        <div>
            <h1>Quote Preview</h1>
            <Suspense fallback={<QuotePreviewSkeleton />}>
                <QuotePreview quoteId={id as string} />
            </Suspense>
            <form action="/api/checkout_sessions" method="POST">
                <input type="hidden" name="quoteId" value={id} />
                <section>
                    <button type="submit" role="link">
                        Checkout
                    </button>
                </section>
            </form>
        </div>
    )
}


/**
 * Display the quote preview, the following information about the quote is fetched
 * from the database:
 * premium
 * limit
 * deductible
 */
async function QuotePreview({ quoteId }: { quoteId: string | undefined }) {
    const data = await fetchQuote(quoteId);
    if (!data) {
        return <div>Quote not found</div>;
    }

    const { id, premium, limit, deductible } = data;

    return (
        <div>
            <p>Premium: ${premium?.toLocaleString()}</p>
            <p>Limit: ${limit?.toLocaleString()}</p>
            <p>Deductible: ${deductible?.toLocaleString()}</p>
        </div>
    )
}

function QuotePreviewSkeleton() {
    return (
        <div>
            <h2>Loading...</h2>
        </div>
    )
}