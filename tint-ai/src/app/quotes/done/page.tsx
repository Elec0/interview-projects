"use client";

import { useSearchParams } from "next/navigation";


export default function Page() {
    const searchParams = useSearchParams();
   
    const success = searchParams.get('success') === 'true';
    const canceled = searchParams.get('canceled') === 'true';

    if (success) {
        return <h1>Payment successful!</h1>;
    }
    else if (canceled) {
        return <h1>Payment canceled!</h1>;
    }

    return <h1>Something went wrong</h1>;
    
}