import { useState, useEffect } from 'react';
import { fetchInterceptor } from './fetchInterceptor';

export function useFetch<T>(url: string, options?: RequestInit): { data: T | null, error: Error | null, loading: boolean, refresh: () => void } {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    async function fetchData() {
        setLoading(true);
        setError(null);

        try {
            const response = await fetchInterceptor(url, options);
            const data = await response.json();
            setData(data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Unknown error'));
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [url, options]);

    return { data, error, loading, refresh: fetchData };
}
