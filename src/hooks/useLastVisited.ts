'use client';
import { VisitedCharacter } from '@/types/character.types';
import { useEffect, useState } from 'react';


const LAST_VISITED_KEY = 'lastVisited';
const MAX_VISITED = 5;

const getLastVisited = (): VisitedCharacter[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(LAST_VISITED_KEY);
    return stored ? JSON.parse(stored) : [];
}

export const useLastVisited = () => {
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