import { getAllPokemon } from "@/libs/api";
import { PokemonEntry } from "@/types/pokemon";
import PaginatedPokemonList from "./_components/PaginatedPokemonList";

const Home = async () => {
  const pokemonEntries: PokemonEntry[] = await getAllPokemon();
  return (
    <PaginatedPokemonList pokemonEntries={pokemonEntries} />
  );
};

export default Home;
