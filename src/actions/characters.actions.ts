'use server';

import { API_BASE_URL } from "@/config/constants";
import { Character, CharactersResponse } from "@/types/character.types";

const REVALIDATE_SECONDS = 3600; // 1 hour

type LoadCharactersAction = {
    page?: number | string;
    name?: string;
}

const loadCharacters = async ({
    page = 1,
    name,
}: LoadCharactersAction): Promise<CharactersResponse | null> => {
    const params = new URLSearchParams({ page: String(page) });
    if (name) params.set('name', name);

    const result = await fetch(`${API_BASE_URL}/character/?${params}`, {
        next: { revalidate: REVALIDATE_SECONDS },
    });

    if (result.status === 404) {
        return null;
    }

    if (!result.ok) {
        throw new Error(`Failed to load characters (${result.status})`);
    }

    return result.json();
}

const getCharacterDetail = async (id: string): Promise<Character> => {
    const result = await fetch(`${API_BASE_URL}/character/${id}`, {
        next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!result.ok) {
        throw new Error(`Failed to load character details (${result.status})`);
    }

    return result.json();
}

export {
    getCharacterDetail,
    loadCharacters
}
