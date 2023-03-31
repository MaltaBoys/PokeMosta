import React, { useState, useEffect } from "react";
import { PokemonCard } from "../../../hooks";

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
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div className="p-4 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 bg-slate-700">
        {pokemonList.map((pokemon) => (
          <PokemonCard pokemonId={pokemon.name} />
        ))}
      </div>
    </>
  );
};

export default ListCards;
