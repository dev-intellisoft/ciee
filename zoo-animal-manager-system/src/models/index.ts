export interface Animal {
    id: number;
    name: string;
    description: string;
    birthDate: string; // ISO format date
    species: string;
    habitat: string;
    countryOfOrigin: string;
    cares: Care[];
}

export interface Care {
    id: number;
    name: string;
    description: string;
    frequency: string;
}

export interface AnimalCare {
    id: number;
    animalId: number;
    careId: number;
}
