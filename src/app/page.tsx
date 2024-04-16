import { getRawPokemonList, getRawPokemon, paginate } from "@/actions/pokeAPI"
import { Pokemon } from "@/interfaces"
import { getPokemonCards } from "@/actions/methods"
import { Pokemons } from "@/components/pokemon-card"
import { Input } from "@/components/ui/input"
import { LoadMore } from "@/components/load-more"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import Search from "@/components/search"



export default async function Home({
  searchParams
}: {
  searchParams?: {
    query?: string
    sortBy?: keyof Pokemon
    sortOrder?: string
  }
}) {

  

  const pokemonList = await getRawPokemonList(1);
  const pokemonCards = await getPokemonCards(pokemonList);


  const allPokemons = await getRawPokemonList(1,1025);
  const page = 1;
  const perPage = 10;
  const searchQuery = searchParams?.query;
  const sortBy = searchParams?.sortBy;
  const sortOrder = searchParams?.sortOrder;
  const paginatedResults = await paginate(allPokemons, page, perPage, searchQuery, sortBy, sortOrder);
  // const pokemonCards = await getPokemonCards(paginatedResults);
  console.log(paginatedResults)
  return (
    <>
      <Search/>

      {/* {JSON.stringify(paginatedResults)} */}
      <div className="container mx-auto p-4 min-h-screen max-w-5xl">
        {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-3 pd">
          <Input className="p-4 mb-4"/>
          <Select>  
            <SelectTrigger>
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="idUp">Sort by ID</SelectItem>
                <SelectItem value="idDown">Sort by Name</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>  
            <SelectTrigger>
              <SelectValue placeholder="Sort order..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="asc">Asc.</SelectItem>
                <SelectItem value="desc">Desc.</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          
            Search
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
          <Pokemons pokemons={pokemonCards} />
          <LoadMore query={searchParams}/>
        </div>
      </div>
    </>
  );
}
