import { CharLocation } from "./location.types";

export interface Info {
    count: number;
    pages: number;
    next:  string;
    prev:  string;
}

export interface CharactersResponse {
    info:    Info;
    results: Character[];
}

export interface Character {
    id:       number;
    name:     string;
    status:   string;
    species:  string;
    type:     string;
    gender:   string;
    origin:   CharLocation;
    location: CharLocation;
    image:    string;
    episode:  string[];
    url:      string;
    created:  Date;
}

export interface VisitedCharacter {
    id:     number;
    name:   string;
    status: string;
    image:  string;
}
