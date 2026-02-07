
export interface CharLocation {
    name: string;
    url:  string;
}

export interface FetchLocationResult {
    id:        number;
    name:      string;
    type:      string;
    dimension: string;
    residents: string[];
    url:       string;
    created:   Date;
}
