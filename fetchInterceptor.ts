import { getCachedResponse, cacheResponse } from './cacheManager';

export async function fetchInterceptor(input: RequestInfo, init?: RequestInit): Promise<Response> {
    const request = new Request(input, init);

    if (request.method !== 'GET') {
        return fetch(request);
    }

    const cachedResponse = await getCachedResponse(request);

    if (cachedResponse) {
        console.log("Returning from cache");
        return cachedResponse;
    }

    const response = await fetch(request);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (response && response.status === 200) {
        await cacheResponse(request, response);
    }

    return response;
}
