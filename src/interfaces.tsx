export interface Pokemon {
    id: number;
    name: string;
}

export interface PokemonCard {
    id: number;
    name: string;
    types: TypeSlot[];
}

interface PokemonType {
    name: string;
    url: string;
}
  
export interface TypeSlot {
slot: number;
type: PokemonType;
}
