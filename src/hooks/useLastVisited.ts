'use client';
import { VisitedCharacter } from '@/types/character.types';
import { useEffect, useState } from 'react';


const LAST_VISITED_KEY = 'lastVisited';
const MAX_VISITED = 5;

const getLastVisited = (): VisitedCharacter[] => {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(LAST_VISITED_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

/**
 * Hook to manage the last visited characters list persisted in localStorage.
 *
 * - `visited` is `null` while loading from storage, then becomes an array.
 * - `addVisited(char)` prepends a character (deduplicates by id, max 5 items).
 * - `clearVisited()` removes all entries from localStorage and state.
 *
 * @returns `{ visited, addVisited, clearVisited }`
 *
 * @example
 * ```tsx
 * const { visited, addVisited, clearVisited } = useLastVisited();
 * addVisited({ id: 1, name: 'Rick', image: '...', status: 'Alive' });
 * ```
 */
export const useLastVisited = () => {
    // visited is null while loading, then becomes array (empty or with items)
    const [visited, setVisited] = useState<VisitedCharacter[] | null>(null);

    useEffect(() => {
        function loadStorage() {
            setVisited(getLastVisited());
        }
        loadStorage();
    }, []);

    const addVisited = (char: VisitedCharacter) => {
        setVisited((prev) => {
            const filtered = prev?.filter((c) => c.id !== char.id) || [];
            const firstItems = [char, ...filtered].slice(0, MAX_VISITED);

            localStorage.setItem(LAST_VISITED_KEY, JSON.stringify(firstItems));
            return firstItems;
        });
    };

    const clearVisited = () => {
        localStorage.removeItem(LAST_VISITED_KEY);
        setVisited([]);
    }

    return { visited, addVisited, clearVisited };
};