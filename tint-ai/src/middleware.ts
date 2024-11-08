import logger from '@/logger'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    const time = new Date().getTime();

    logger.info({ event: 'REQUEST', url: request.url })
    const response = NextResponse.next();
    logger.info({ event: 'RESPONSE', responseCode: response.status, durationMs: new Date().getTime() - time });
    
    return response;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|robots.txt|images|$).*)',
    ]
}