import { CharLocation } from "./location.types";

export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';
export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown';

export interface Info {
    count: number;
    pages: number;
    next:  string | null;
    prev:  string | null;
}

export interface CharactersResponse {
    info:    Info;
    results: Character[];
}

export interface Character {
    id:       number;
    name:     string;
    status:   CharacterStatus;
    species:  string;
    type:     string;
    gender:   CharacterGender;
    origin:   CharLocation;
    location: CharLocation;
    image:    string;
    episode:  string[];
    url:      string;
    created:  string;
}

export interface VisitedCharacter {
    id:     number;
    name:   string;
    status: CharacterStatus;
    image:  string;
}
