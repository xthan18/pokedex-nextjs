import { Pokemon } from "@/interfaces";
import { TypeSlot, PokemonCard } from "@/interfaces";
import { getRawPokemon, getDamageRelations } from "./pokeAPI";

function addZeroesToID(ID: number) {
    let len = String(ID).length;
    if (len == 2) 
        {
            return ("0" + String(ID));
        } 
        else if (len == 1)
        {
            return ("00" + String(ID));
        }
        else
        {
            return String(ID);
        }
}

export function getPokemonImageURL(ID: number) {
    return ("https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + addZeroesToID(ID) + ".png");
}

export function formatName(input: string): string {
    return input
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export function getTypeNames(typeSlots: TypeSlot[]): string[] {
    return typeSlots.map(typeSlot => typeSlot.type.name)
}

export function addTypes(pokemonList : Pokemon[]): any {
    const pokemonWithTypeList = pokemonList.map(async item=>{
        return await getRawPokemon(item.id)
    })
    return pokemonWithTypeList
}

export async function getPokemonCards(pokemonList: any) {
    const pokemonCards: any = []
    for (const key in pokemonList) {
        const card = await getRawPokemon(pokemonList[key].id)
        pokemonCards.push({
            id: pokemonList[key].id,
            name: pokemonList[key].name,
            types: card.types,
        })
    }
    return pokemonCards;
}

function arrayDifference(A: any[], B: any[]): any[] {
    return A.filter(item => !B.includes(item));
}

function addAndRemoveDuplicates(array1: any[], array2: any[]): any[] {
    // Combine the arrays using concat
    const combinedArray = array1.concat(array2);

    const combinedSet = new Set(combinedArray);
    const uniqueArray = Array.from(combinedSet.values());;

    return uniqueArray;
}

export async function calculateWeakness(typeNames: string[]) {
    
    const damage1 = await getDamageRelations(typeNames[0]);
    const weak1 = {
        double_damage_from: damage1.double_damage_from.map((type: any)=>(type.name)),
        half_damage_from: damage1.half_damage_from.map((type: any)=>(type.name)),
        no_damage_from: damage1.no_damage_from.map((type: any)=>(type.name)),
    }
    if (typeNames.length === 1){
        return weak1.double_damage_from;
    }
    else{
        const damage2 = await getDamageRelations(typeNames[1]);
        const weak2 = {
            double_damage_from: damage2.double_damage_from.map((type: any)=>(type.name)),
            half_damage_from: damage2.half_damage_from.map((type: any)=>(type.name)),
            no_damage_from: damage2.no_damage_from.map((type: any)=>(type.name)),
        }
        // (weak1.double_damage_from - weak2.half_damage_from - weak2.no_damage_from) + (weak2.double_damage_from - weak1.half_damage_from - weak1.no_damage_from)
        const diff1 = arrayDifference(arrayDifference(weak1.double_damage_from,weak2.half_damage_from),weak2.no_damage_from)
        const diff2 = arrayDifference(arrayDifference(weak2.double_damage_from,weak1.half_damage_from),weak1.no_damage_from)
        const result = addAndRemoveDuplicates(diff1,diff2);
        return result;
    }
}