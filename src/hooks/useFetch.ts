import { useState, useEffect } from 'react';

interface UseFetchReturn<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

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
