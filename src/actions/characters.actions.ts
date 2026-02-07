'use server';

import { API_BASE_URL } from "@/config/constants";
import { Character, CharactersResponse } from "@/types/character.types";

type LoadCharactersAction = {
    page?: number | string;
    name?: string;
}

const loadCharacters = async ({
    page = 1,
    name,
}: LoadCharactersAction): Promise<CharactersResponse | null> => {
    try {
        const params = new URLSearchParams({ page: String(page) });
        if (name) params.set('name', name);

        const result = await fetch(`${API_BASE_URL}/character/?${params}`);

        if (result.status === 404) {
            return null;
        }

        if (!result.ok) {
            throw new Error('Failed to load characters');
        }

        return await result.json();

    } catch (error) {
        console.error('Error loading characters:', error);
        throw new Error('Failed to load characters');
    }
}

const getCharacterDetail = async (id: string): Promise<Character> => {
    try {
        const result = await fetch(`${API_BASE_URL}/character/${id}`);

        if (!result.ok) {
            throw new Error('Failed to load character details');
        }

        return await result.json();
    } catch (error) {
        console.error('Error loading character details:', error);
        throw new Error('Failed to load character details');
    }
}

export {
    getCharacterDetail,
    loadCharacters
}
