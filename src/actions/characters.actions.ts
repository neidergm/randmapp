'use server';

import { API_BASE_URL } from "@/config/constants";
import { Character, CharactersResponse } from "@/types/character.types";

type LoadCharactersAction = {
    page?: number | string;
}

const loadCharacters = async ({
    page = 1,
}: LoadCharactersAction): Promise<CharactersResponse> => {
    try {
        const result = await fetch(`${API_BASE_URL}/character/?page=${page}`);

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
