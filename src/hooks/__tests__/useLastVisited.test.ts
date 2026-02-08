import { renderHook, act } from '@testing-library/react';
import { useLastVisited } from '../useLastVisited';
import { VisitedCharacter } from '@/types/character.types';

const mockCharacter = (id: number): VisitedCharacter => ({
    id,
    name: `Character ${id}`,
    image: `https://example.com/${id}.jpg`,
    status: 'Alive',
});

describe('useLastVisited', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.restoreAllMocks();
    });

    it('should load visited characters from localStorage on mount', () => {
        const stored = [mockCharacter(1), mockCharacter(2)];
        localStorage.setItem('lastVisited', JSON.stringify(stored));

        const { result } = renderHook(() => useLastVisited());

        expect(result.current.visited).toEqual(stored);
    });

    it('should return empty array when localStorage is empty', () => {
        const { result } = renderHook(() => useLastVisited());

        expect(result.current.visited).toEqual([]);
    });

    it('should add a character to the beginning of the list', () => {
        const { result } = renderHook(() => useLastVisited());

        act(() => {
            result.current.addVisited(mockCharacter(1));
        });

        expect(result.current.visited?.[0]).toEqual(mockCharacter(1));
    });

    it('should deduplicate characters by id', () => {
        localStorage.setItem('lastVisited', JSON.stringify([mockCharacter(1), mockCharacter(2)]));

        const { result } = renderHook(() => useLastVisited());

        act(() => {
            result.current.addVisited(mockCharacter(1));
        });

        const ids = result.current.visited?.map((c) => c.id);
        expect(ids?.filter((id) => id === 1)).toHaveLength(1);
        expect(result.current.visited?.[0].id).toBe(1);
    });

    it('should respect maximum of 5 visited characters', () => {
        const initial = [1, 2, 3, 4, 5].map(mockCharacter);
        localStorage.setItem('lastVisited', JSON.stringify(initial));

        const { result } = renderHook(() => useLastVisited());

        act(() => {
            result.current.addVisited(mockCharacter(6));
        });

        expect(result.current.visited).toHaveLength(5);
        expect(result.current.visited?.[0].id).toBe(6);
        expect(result.current.visited?.find((c) => c.id === 5)).toBeUndefined();
    });

    it('should persist to localStorage when adding', () => {
        const { result } = renderHook(() => useLastVisited());

        act(() => {
            result.current.addVisited(mockCharacter(1));
        });

        const stored = JSON.parse(localStorage.getItem('lastVisited') || '[]');
        expect(stored).toHaveLength(1);
        expect(stored[0].id).toBe(1);
    });

    it('should clear all visited characters', () => {
        localStorage.setItem('lastVisited', JSON.stringify([mockCharacter(1)]));

        const { result } = renderHook(() => useLastVisited());

        act(() => {
            result.current.clearVisited();
        });

        expect(result.current.visited).toEqual([]);
        expect(localStorage.getItem('lastVisited')).toBeNull();
    });
});
