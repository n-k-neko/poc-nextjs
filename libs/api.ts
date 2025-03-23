import { PokemonEntry } from "@/types/pokemon";

const PokemonAPI = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";

export const getAllPokemon = async (): Promise<PokemonEntry[]> => {
  const res = await fetch(PokemonAPI);
  const data = await res.json();
  return data.results as PokemonEntry[];
};

export const getPokemon = async (url: string): Promise<any> => {
  console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  return data;
};