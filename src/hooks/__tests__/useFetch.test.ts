import { renderHook, waitFor } from '@testing-library/react';
import { useFetch } from '../useFetch';

describe('useFetch', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });

    it('should return data on successful fetch', async () => {
        const mockData = { id: 1, name: 'Rick' };
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockData),
        });

        const { result } = renderHook(() => useFetch<typeof mockData>('https://api.example.com/data'));

        expect(result.current.loading).toBe(true);

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.data).toEqual(mockData);
        expect(result.current.error).toBeNull();
    });

    it('should return error on HTTP error', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            status: 500,
        });

        const { result } = renderHook(() => useFetch('https://api.example.com/data'));

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.error).toBeInstanceOf(Error);
        expect(result.current.error?.message).toContain('500');
        expect(result.current.data).toBeNull();
    });

    it('should not fetch when URL is empty', async () => {
        global.fetch = jest.fn();

        const { result } = renderHook(() => useFetch(''));

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(global.fetch).not.toHaveBeenCalled();
        expect(result.current.data).toBeNull();
        expect(result.current.error).toBeNull();
    });

    it('should handle network errors', async () => {
        global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

        const { result } = renderHook(() => useFetch('https://api.example.com/data'));

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.error).toBeInstanceOf(Error);
        expect(result.current.error?.message).toBe('Network error');
        expect(result.current.data).toBeNull();
    });

    it('should abort fetch on unmount', async () => {
        let abortCalled = false;
        const originalAbort = AbortController.prototype.abort;
        AbortController.prototype.abort = function () {
            abortCalled = true;
            return originalAbort.call(this);
        };

        global.fetch = jest.fn().mockImplementation(
            () => new Promise((resolve) => setTimeout(() => resolve({ ok: true, json: () => ({}) }), 5000))
        );

        const { unmount } = renderHook(() => useFetch('https://api.example.com/data'));
        unmount();

        expect(abortCalled).toBe(true);
        AbortController.prototype.abort = originalAbort;
    });
});
