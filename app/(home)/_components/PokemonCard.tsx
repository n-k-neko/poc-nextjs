'use client';
import { Pokemon } from "@/types/pokemon";
import React from "react";

interface PokemonCardProps {
    pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }:PokemonCardProps) => {
    console.log(pokemon);
    return (
        <div className="pokemon-card bg-white shadow-md rounded-lg overflow-hidden w-80 mx-auto">
          <div className="pokemon-card__image">
            <img className="w-full h-56 object-contain" src={pokemon.sprites.front_default} alt={pokemon.name} />
          </div>
          <div className="pokemon-card__name text-center p-4">
            <h2 className="text-xl font-bold">{pokemon.name}</h2>
            <div className="pokemon-card__types mt-2">
              {pokemon.types.map((typeInfo, index) => (
                <span key={index} className="text-sm bg-gray-200 rounded-full px-2 py-1 mr-2">
                  {typeInfo.type.name}
                </span>
              ))}
            </div>
          </div>
        </div>
    );
}

export default PokemonCard;