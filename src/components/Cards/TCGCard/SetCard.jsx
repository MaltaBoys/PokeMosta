import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ColorThief from "color-thief";

const SetCard = ({ pokemonSetId }) => {
  const [pokemonSetCard, setPokemonSetCard] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("");

  // We connect to the api to collect the data in JSON
  useEffect(() => {
    fetch(`https://api.pokemontcg.io/v2/sets/${pokemonSetId}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemonSetCard(data.data);
      });
  }, [pokemonSetId]);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = pokemonSetCard.images.logo;

    img.addEventListener("load", () => {
      const colorThief = new ColorThief();
      const color = colorThief.getColor(img);
      setBackgroundColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
    });
  }, [pokemonSetCard.images.logo]);

  // If we don't have the data, we show a loading message
  if (!pokemonSetCard) {
    return (
      <div className="p-4 bg-white rounded-xl shadow-xl dark:bg-gray-800">
        <div class="animate-pulse flex items-center justify-center w-full h-36 bg-gray-300 rounded-lg dark:bg-gray-700">
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
        <div class="animate-pulse h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-40 my-4"></div>
        <div class="flex items-center w-full space-x-2">
          <div class="animate-pulse h-3 bg-gray-400 rounded-full dark:bg-gray-600 w-20"></div>
          <div class="animate-pulse h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-10"></div>
        </div>
      </div>
    );
  }

  const pokemonImage =
    "https://images.pokemontcg.io/" + pokemonSetCard.id + "/logo.png";

  // We return the Card of the pokemon with the details
  return (
    <>
      <div
        className="p-4 bg-white rounded-xl shadow-md dark:shadow-xl dark:bg-gray-800"
        key={pokemonSetCard.name}
      >
        <Link
          to={`/tcg/${pokemonSetCard.id}`}
          className="mb-2 select-none h-32 p-4 rounded-lg flex items-center justify-center bg-gray-700"
          style={{ backgroundColor }}
        >
          <img
            src={pokemonImage}
            alt={pokemonSetCard.name}
            className="h-full"
          />
        </Link>
        <h2 className="mb-4 font-bold text-xl text-gray-800 hover:text-black capitalize dark:text-gray-100">
          <Link to={`/tcg/${pokemonSetCard.id}`}>{pokemonSetCard.name}</Link>
        </h2>
      </div>
    </>
  );
};

export default SetCard;
