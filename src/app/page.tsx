import { getRawPokemonList, getRawPokemon } from "@/actions/pokeAPI"
import { getPokemonCards } from "@/actions/methods"
import { Pokemons } from "@/components/pokemon-card"
import { Input } from "@/components/ui/input"
import { LoadMore } from "@/components/load-more"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default async function Home() {

  const pokemonList = await getRawPokemonList(1);
  const pokemonCards = await getPokemonCards(pokemonList);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto p-4 min-h-screen max-w-5xl">
        <div className="grid grid-cols-4 gap-4">
          <Input className="p-4 mb-4"/>
          <Select>  
            <SelectTrigger>
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="idUp">Sort by ID Asc.</SelectItem>
                <SelectItem value="idDown">Sort by ID Desc.</SelectItem>
                <SelectItem value="nameUp">Sort by Name Asc.</SelectItem>
                <SelectItem value="nameDown">Sort by Name Desc.</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Pokemons pokemons={pokemonCards} />
          <LoadMore />
        </div>
      </div>
    </main>
  );
}
