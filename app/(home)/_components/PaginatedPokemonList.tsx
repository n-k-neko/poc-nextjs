'use client';
import { useEffect, useState } from "react";
import { PokemonEntry, Pokemon } from "@/types/pokemon";
import PokemonCard from "./PokemonCard";

interface PaginatedPokemonListProps {
  pokemonEntries: PokemonEntry[];
}

const ITEMS_PER_PAGE = 20;

const PaginatedPokemonList = ({ pokemonEntries }: PaginatedPokemonListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoaded, setIsLoaded] = useState(true);
  const [selectedPokemonRecords, setSelectedPokemonRecords] = useState<Pokemon[]>([]);

  const totalPages = Math.ceil(pokemonEntries.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  useEffect(() => {
    const fetchDisplayPokemonData = async (entries: PokemonEntry[]): Promise<Pokemon[]> => {
      const res = await Promise.all(entries.map(async (entry) => {
        const res = await fetch(entry.url);
        const data = await res.json();
        const { name, sprites, types } = data;
        return { name, sprites, types } as Pokemon;
      }));
      return res;
    };

    const loadDisplayPokemonData = async (entries: PokemonEntry[]) => {
      const data = await fetchDisplayPokemonData(entries);
      console.log(data);
      setSelectedPokemonRecords(data);
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const entries = pokemonEntries.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    loadDisplayPokemonData(entries);
    setIsLoaded(false);
  }, [currentPage, pokemonEntries]);

  return (
    <div>
      {isLoaded ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {selectedPokemonRecords.map((record, index) => (
              <PokemonCard key={index} pokemon={record} />
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="btn bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="btn bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaginatedPokemonList;