"use server"
import { Pokemon } from "@/interfaces";

const POKE_API = "https://pokeapi.co/api/v2/";

export async function getRawPokemonList(page: number, perPage: number = 10) {
    const offset = (page-1)*perPage;
    const response = await fetch(POKE_API + "pokemon?limit=" + String(perPage) + "&offset=" + String(offset));
    const data = await response.json();

    const pokemonList: Array<Pokemon> = data.results.map((item: any) => ({
        id: parseInt(item.url.split('/').slice(-2, -1)[0]), // Extracting id from the url
        name: item.name
      }));
    return pokemonList;
}

export async function getRawPokemon(input: string | number) {
    const response = await fetch(POKE_API + "pokemon/" + String(input));
    const data = await response.json();
    return data;
}

export async function getDamageRelations(input: string) {
    const response = await fetch(POKE_API + "type/" + String(input));
    console.log(POKE_API + "type/" + String(input))
    const data = await response.json();
    return data.damage_relations;
}

