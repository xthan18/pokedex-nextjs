"use client"

import { useEffect, useState } from "react";
import { Pokemon, PokemonCard } from "@/interfaces";
import { useInView } from "react-intersection-observer";
import { Loading } from "./ui/loading";
import { getRawPokemonList } from "@/actions/pokeAPI";
import { Pokemons } from "./pokemon-card";
import { getPokemonCards } from "@/actions/methods";

export function LoadMore() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [pokemonCards, setPokemonCards] = useState<PokemonCard[]>([]);

    const [pagesLoaded, setPagesLoaded] = useState(1);
    const {ref, inView} = useInView();
    
    const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

    const LoadMorePokemons = async ()=>{
        await delay(0);
        const nextPage = pagesLoaded + 1;
        const newPokemons = await getRawPokemonList(nextPage) ?? [];
        const newPokemonCards = await getPokemonCards(newPokemons) ?? [];

        setPokemons((prevPokemons: Pokemon[]) => [...prevPokemons, ...newPokemons]);
        setPokemonCards((prevPokemonCards: PokemonCard[]) => [...prevPokemonCards, ...newPokemonCards]);

        setPagesLoaded(nextPage);
    }

    useEffect(() => {
        if(inView){
            console.log("scrolled to end");
            LoadMorePokemons();
        }
    }, [inView]);
    
    return (
        <>
        <Pokemons pokemons={pokemonCards} />
        <div className="flex justify-center items-center p-4 col-span-2" ref={ref}>
            <Loading/>
        </div>
        </>
    )
}