import React, { useState, useEffect } from "react";
import { PokemonCard } from "../../../hooks";
import { TbPokeball } from "react-icons/tb";

const ListCards = () => {
  const [pokemonList, setPokemonList] = useState(null);

  // Nos conectamos a la api para recoger los datos en JSON
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then((response) => response.json())
      .then((data) => {
        setPokemonList(data.results);
      });
  }, []);

  if (!pokemonList) {
    return (
      <section className="absolute h-full left-0 right-0 pt-52 top-0 ps-40 bg-white dark:bg-gray-900">
        <div className="py-8 px-4 flex flex-col items-center text-center lg:py-16 lg:px-12">
          <TbPokeball className="text-6xl text-gray-400" />
          <h1 className="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-900 lg:mb-6 md:text-5xl xl:text-6xl dark:text-white">
            Recogiendo datos...
          </h1>
          <p class="font-light text-gray-500 md:text-lg xl:text-xl dark:text-gray-400">
            Espere mientras cazamos a los pokemons :)
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <div className="p-4 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 dark:bg-slate-700">
        {pokemonList.map((pokemon) => (
          <PokemonCard pokemonId={pokemon.name} />
        ))}
      </div>
    </>
  );
};

export default ListCards;
