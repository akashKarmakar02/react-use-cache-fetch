import { useState } from 'react';
import { deleteCachedResponse } from './cacheManager';

export function useDeleteCache(url: string): { isDeleted: boolean, deleteCache: () => Promise<void> } {
    const [isDeleted, setIsDeleted] = useState<boolean>(false);

    async function deleteCache() {
        const request = new Request(url);
        const deleted = await deleteCachedResponse(request);
        setIsDeleted(deleted);
    }

    return { isDeleted, deleteCache };
}
