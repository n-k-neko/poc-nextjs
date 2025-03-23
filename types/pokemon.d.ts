export interface PokemonEntry {
    name: string;
    url: string;
}

export interface Pokemon {
    name: string;
    sprites: {
        front_default: string;
    };
    types: { type: { name: string, url: string } }[]; // slotフィールドなどは含めない
}