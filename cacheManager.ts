export const CACHE_NAME = 'react-cache-fetch';

export async function openCache(): Promise<Cache> {
    return await caches.open(CACHE_NAME);
}

export async function getCachedResponse(request: Request): Promise<Response | undefined> {
    const cache = await openCache();
    return await cache.match(request);
}

export async function cacheResponse(request: Request, response: Response): Promise<void> {
    const cache = await openCache();
    console.log("New data")
    await cache.put(request, response.clone());
}

export async function deleteCache(): Promise<void> {
    await caches.delete(CACHE_NAME);
}

export async function deleteCachedResponse(request: Request): Promise<boolean> {
    const cache = await openCache();
    return await cache.delete(request);
}