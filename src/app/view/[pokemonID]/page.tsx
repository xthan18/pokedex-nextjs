import { getRawPokemon } from "@/actions/pokeAPI";
import { formatName, getPokemonImageURL, getTypeNames, calculateWeakness } from "@/actions/methods";
import { TypeSlot } from "@/interfaces";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link";

export default async function PokemonPage({ params }: { params: { pokemonID: number } }) {
    const { pokemonID } = params;
    const pokemonObject = await getRawPokemon(pokemonID);
    const typeNames = getTypeNames(pokemonObject.types).map((type) => (type))
    const weakFromTypes = await calculateWeakness(typeNames);
    // const weakFromTypes = weakFrom.map((type: any) => type.name);
    // console.log(test)
    return (
        <>
            {/* {JSON.stringify(weakFromTypes)} */}
            <Card key={pokemonID} className="">
                <Image src={getPokemonImageURL(pokemonID)} alt="Pokemon Image" height={450} width={450} />

                {/* name and id */}


                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{formatName(pokemonObject.name)}</div>
                    <p className="text-base">
                        ID: #{pokemonID}
                    </p>
                    
                    {/* types */}
                    <div className="mt-4">
                        <span>Types: </span>
                        {
                            getTypeNames(pokemonObject.types).map((type) => (
                                <span key={type} className="inline-block rounded-full px-3 py-1 text-sm bg-slate-600 font-semibold  mr-2">
                                    {type.toUpperCase()}
                                </span>
                            ))}
                    </div>

                    {/* weaknesses */}
                    <div className="mt-4">
                        <span>Weaknesses: </span>
                        {
                            weakFromTypes.map((type: any) => (
                                <span key={type} className="inline-block rounded-full px-3 py-1 text-sm bg-slate-600 font-semibold  mr-2">
                                    {type.toUpperCase()}
                                </span>
                            ))}
                    </div>
                    <div className="mt=4">

                        <span>Stats: </span>
                        {pokemonObject.stats.map((stat: any, index: any) => (
                            <span key={index}>
                                <p>{stat.stat.name}: {stat.base_stat}</p>
                            </span>
                        ))}
                    </div>
                    {/* navigate */}
                    <div className="mt-4 text-center">

                        {+pokemonID !== 1 && (
                            <>
                                <Link
                                    href={String(+pokemonID - 1)}
                                    key={String(+pokemonID - 1)}
                                >
                                    <Button variant="outline" size="icon">
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </>
                        )}

                        {+pokemonID !== 1025 && (
                            <Link
                                href={String(+pokemonID + 1)}
                                key={String(+pokemonID + 1)}
                            >
                                <Button variant="outline" size="icon">
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        )}

                    </div>

                </div>
            </Card>
        </>
    )
}