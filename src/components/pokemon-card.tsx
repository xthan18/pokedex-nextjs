"use client";

import { Pokemon, PokemonCard } from "@/interfaces";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { getPokemonImageURL, formatName, getTypeNames } from "@/actions/methods";
import Link from "next/link";

export interface PokemonProps {
    pokemons: any[] | null;
}

export function Pokemons({ pokemons }: PokemonProps) {

    return (
        <>
        {pokemons ? (
            pokemons.map((pokemon) => <Card key={pokemon.id} className="">
                {/* <div className="max-w-xs rounded overflow-hidden shadow-lg"> */}
                    <img className="w-full" src={getPokemonImageURL(pokemon.id)} alt="Pokemon Image" />
                    <div className="px-6 py-4">
                    <Link
                        href={String(pokemon.id)}
                        key={String(pokemon.id) + "Card"}
                    >
                    <div className="font-bold text-xl mb-2">{formatName(pokemon.name)}</div>
                    </Link>
                    <p className="text-base">
                    ID: #{pokemon.id}
                    </p>

                    <div className="mt-4">
                        {
                            getTypeNames(pokemon.types).map((type) => (
                                <span key={type} className="inline-block rounded-full px-3 py-1 text-sm bg-slate-600 font-semibold  mr-2">
                                    {type.toUpperCase()}
                                </span>
                            ))}
                    </div>

                    {/* <div className="mt-4">
                        <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold bg-slate-600 mr-2">{JSON.stringify(pokemon.types)}</span>
                        <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold bg-slate-600 mr-2">Type2</span>
                    </div> */}
                    </div>
                {/* </div> */}
            </Card>)
        ) : (
            <div className="text-xl font-bold">No Results</div>
        )}
        </>
    )
}