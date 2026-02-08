'use server';

import { revalidateTag } from "next/cache";
import { API_BASE_URL } from "@/config/constants";
import { Character, CharactersResponse } from "@/types/character.types";

const REVALIDATE_SECONDS = 3600; // 1 hour
const TAG_CHARACTERS = 'characters';
const TAG_CHARACTER_DETAIL = 'character-detail';

type LoadCharactersAction = {
    page?: number | string;
    name?: string;
}

/**
 * Fetches a paginated list of characters from the Rick and Morty API.
 * Results are ISR-cached for 1 hour and tagged for on-demand revalidation.
 *
 * @param options.page - Page number (defaults to 1).
 * @param options.name - Optional character name filter.
 * @returns The characters response, or `null` if no results match (404).
 * @throws {Error} On non-404 HTTP errors.
 */
const loadCharacters = async ({
    page = 1,
    name,
}: LoadCharactersAction): Promise<CharactersResponse | null> => {
    const params = new URLSearchParams({ page: String(page) });
    if (name) params.set('name', name);

    const result = await fetch(`${API_BASE_URL}/character/?${params}`, {
        next: { revalidate: REVALIDATE_SECONDS, tags: [TAG_CHARACTERS] },
    });

    if (result.status === 404) {
        return null;
    }

    if (!result.ok) {
        throw new Error(`Failed to load characters (${result.status})`);
    }

    return result.json();
}

/**
 * Fetches a single character's full details by ID.
 * The result is ISR-cached for 1 hour and tagged per character for granular revalidation.
 *
 * @param id - The character's numeric ID as a string.
 * @returns The full `Character` object.
 * @throws {Error} If the API responds with a non-OK status.
 */
const getCharacterDetail = async (id: string): Promise<Character> => {
    const result = await fetch(`${API_BASE_URL}/character/${id}`, {
        next: { revalidate: REVALIDATE_SECONDS, tags: [TAG_CHARACTER_DETAIL, `character-${id}`] },
    });

    if (!result.ok) {
        throw new Error(`Failed to load character details (${result.status})`);
    }

    return result.json();
}

/**
 * Invalidates the ISR cache for all character data.
 * Call from the client to force fresh data on the next request.
 */
const revalidateCharacters = async () => {
    revalidateTag(TAG_CHARACTERS, "max");
    revalidateTag(TAG_CHARACTER_DETAIL, "max");
}

export {
    getCharacterDetail,
    loadCharacters,
    revalidateCharacters
}
