import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

function Card({ pokemonId }) {
  const [pokemonCard, setPokemonCard] = useState(null);

  // Nos conectamos a la api para recoger los datos en JSON
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemonCard(data);
      });
  }, [pokemonId]);

  // Si no tenemos los datos, mostramos un mensaje de carga
  if (!pokemonCard) {
    return (
      <div className="relative p-4 bg-white border border-gray-200 rounded-xl shadow-xl dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between z-20">
          <div class="flex items-center w-full space-x-2">
            <div class="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-12"></div>
          </div>
          <AiFillStar className="w-6 h-6 text-gray-700 cursor-pointer hover:text-gray-900" />
        </div>
        <div class="mt-2 flex items-center justify-center w-full h-48 bg-gray-300 rounded dark:bg-gray-700">
          <svg
            class="w-12 h-12 text-gray-200"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 640 512"
          >
            <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
          </svg>
        </div>
        <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-32 my-4"></div>
        <div class="flex items-center w-full space-x-2">
          <div class="h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-10"></div>
          <div class="h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-10"></div>
        </div>
      </div>
    );
  }

  // Guardamos los tipos de pokemon que hay (dos máximo)
  const types = pokemonCard.types.map((type) => type.type.name);
  const priType = types[0];
  const secType = types[1] || null;

  // Array de los estilos para cada tipo de Pokemon.
  const typesStyleSheet = {
    bug: "t-bug dark:t-bug",
    dark: "t-dark dark:t-dark",
    dragon: "t-dragon dark:t-dragon",
    electric: "t-electric dark:t-electric",
    fairy: "t-fairy dark:t-fairy",
    fighting: "t-fighting dark:t-fighting",
    fire: "t-fire dark:t-fire",
    flying: "t-flying dark:t-flying",
    ghost: "t-ghost dark:t-ghost",
    grass: "t-grass dark:t-grass",
    ground: "t-ground dark:t-ground",
    ice: "t-ice dark:t-ice",
    normal: "t-normal dark:t-normal",
    poison: "t-poison dark:t-poison",
    psychic: "t-psychic dark:t-psychic",
    rock: "t-rock dark:t-rock",
    steel: "t-steel dark:t-steel",
    water: "t-water dark:t-water",
  };

  // Obtenemos el estilo correspondiente del primer y segundo tipo de Pokemon o una cadena vacia si no ha sido encontrado.
  const resPriType = typesStyleSheet[priType] || "";
  const resSecType = typesStyleSheet[secType] || "";

  // Devolvemos la Card del pokemon con los detalles
  return (
    <>
      <div
        className="relative p-4 bg-white border border-gray-200 rounded-xl shadow-md dark:shadow-xl dark:bg-gray-800 dark:border-gray-700"
        key={pokemonCard.name}
      >
        <div className="absolute inset-x-4 flex justify-between z-20">
          <div className="ms-2 text-2xl font-extrabold text-gray-700">
            #{pokemonCard.id}
          </div>
          <AiFillStar className="w-6 h-6 text-gray-700 cursor-pointer hover:text-gray-900" />
        </div>
        <div className="relative mb-2">
          <img
            className="absolute inset-x-0 blur-2xl z-0"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonCard.id}.png`}
            alt={pokemonCard.name}
          />
          <img
            className="relative z-10"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonCard.id}.png`}
            alt={pokemonCard.name}
          />
        </div>
        <h2 className="my-4 font-semibold text-lg capitalize dark:text-gray-100">
          <Link to={`/pokemon/${pokemonCard.id}`}>{pokemonCard.name}</Link>
        </h2>
        <div className="flex">
          <div
            className={`me-2 text-sm font-medium mr-2 px-2.5 py-0.5 rounded ${resPriType}`}
          >
            {priType}
          </div>
          <div
            className={`me-2 text-sm font-medium mr-2 px-2.5 py-0.5 rounded ${resSecType}`}
          >
            {secType}
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
