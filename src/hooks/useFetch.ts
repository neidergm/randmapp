import { useState, useEffect } from 'react';

interface UseFetchReturn<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

/**
 * Generic data-fetching hook with loading, error, and abort-on-unmount support.
 *
 * @template T - The expected shape of the response JSON.
 * @param url - The URL to fetch. Pass an empty string to skip the request.
 * @returns An object with `data`, `loading`, and `error` state.
 *
 * @example
 * ```ts
 * const { data, loading, error } = useFetch<User>('https://api.example.com/user/1');
 * ```
 */
export function useFetch<T>(url: string): UseFetchReturn<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!url) {
            setLoading(false);
            return;
        }

        const controller = new AbortController();

        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url, { signal: controller.signal });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
                setError(null);
            } catch (err) {
                if (err instanceof DOMException && err.name === 'AbortError') return;
                setError(err instanceof Error ? err : new Error('Unknown error'));
                setData(null);
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => controller.abort();
    }, [url]);

    return { data, loading, error };
}
