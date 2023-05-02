import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import AOS from "aos";
import "aos/dist/aos";

function Card({ pokemonId }) {
	useEffect(() => {
		AOS.init({
			duration: 800,
			easing: "ease-out-back",
			once: true,
		});
	}, []);

	const [pokemonCard, setPokemonCard] = useState(null);
	const [isHidden1, setIsHidden1] = useState(false);
	const [isHidden2, setIsHidden2] = useState(true);
	// We connect to the api to collect the data in JSON
	useEffect(() => {
		fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
			.then((response) => response.json())
			.then((data) => {
				setPokemonCard(data);
			});
	}, [pokemonId]);

	// If we don't have the data, we show a loading message
	if (!pokemonCard) {
		return (
			<div className="relative p-4 bg-white rounded-xl shadow-md dark:bg-gray-800">
				<div className="flex justify-between z-20">
					<div class="flex items-center w-full space-x-2">
						<div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-12"></div>
					</div>
					<AiFillStar className="w-6 h-6 text-gray-400 cursor-pointer" />
				</div>
				<div class="mt-2 flex items-center justify-center w-full h-72 bg-gray-300 rounded dark:bg-gray-700">
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

	// We keep the types of pokemon that there are (two maximum)
	const types = pokemonCard.types.map((type) => type.type.name);
	const priType = types[0].charAt(0).toUpperCase().concat(types[0].slice(1));
	const secType = types[1]
		? types[1].charAt(0).toUpperCase().concat(types[1].slice(1))
		: null;

	// Array of styles for each type of Pokemon
	const typesStyleSheet = {
		Bug: "t-bug dark:t-bug",
		Dark: "t-dark dark:t-dark",
		Dragon: "t-dragon dark:t-dragon",
		Electric: "t-electric dark:t-electric",
		Fairy: "t-fairy dark:t-fairy",
		Fighting: "t-fighting dark:t-fighting",
		Fire: "t-fire dark:t-fire",
		Flying: "t-flying dark:t-flying",
		Ghost: "t-ghost dark:t-ghost",
		Grass: "t-grass dark:t-grass",
		Ground: "t-ground dark:t-ground",
		Ice: "t-ice dark:t-ice",
		Normal: "t-normal dark:t-normal",
		Poison: "t-poison dark:t-poison",
		Psychic: "t-psychic dark:t-psychic",
		Rock: "t-rock dark:t-rock",
		Steel: "t-steel dark:t-steel",
		Water: "t-water dark:t-water",
	};

	// We get the corresponding style of the first and second types of Pokemon or an empty string if it hasn't been found
	const resPriType = typesStyleSheet[priType] || "";
	const resSecType = typesStyleSheet[secType] || "";

	const pokemonImage =
		"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/" +
		pokemonCard.id +
		".png";
	const pokemonShinyImage =
		"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/" +
		pokemonCard.id +
		".png";
	const toggleDivs = () => {
		setIsHidden1(!isHidden1);
		setIsHidden2(!isHidden2);
	};
	// We return the Card of the pokemon with the details
	return (
		<>
			<div
				data-aos="fade-up"
				className="relative p-4 bg-white rounded-xl shadow-md dark:shadow-xl dark:bg-gray-800"
				key={pokemonCard.name}
			>
				<div className="flex justify-between z-20">
					<div className="text-2xl font-extrabold text-gray-400 dark:text-gray-700 select-none">
						#
						{pokemonCard.id < 10
							? "00" + pokemonCard.id
							: pokemonCard.id < 100
							? "0" + pokemonCard.id
							: pokemonCard.id}
					</div>
					<AiFillStar
						onClick={toggleDivs}
						className="w-6 h-6 text-gray-400 cursor-pointer hover:text-yellow-300 dark:text-gray-700"
					/>
				</div>
				<Link
					to={`/pokemon/${pokemonCard.id}`}
					className="relative mb-2 select-none"
				>
					<img
						src={pokemonImage}
						alt={pokemonCard.name}
						className={
							isHidden1
								? "hidden absolute inset-x-0 blur-2xl z-0 select-none"
								: "absolute inset-x-0 blur-2xl z-0 select-none"
						}
					/>
					<img
						src={pokemonImage}
						alt={pokemonCard.name}
						className={
							isHidden1
								? "hidden relative z-10 select-none"
								: "relative z-10 select-none"
						}
					/>
					<img
						src={pokemonShinyImage}
						alt={pokemonCard.name}
						className={
							isHidden2
								? "hidden absolute inset-x-0 blur-2xl z-0 select-none"
								: "absolute inset-x-0 blur-2xl z-0 select-none"
						}
					/>
					<img
						src={pokemonShinyImage}
						alt={pokemonCard.name}
						className={
							isHidden2
								? "hidden relative z-10 select-none"
								: "relative z-10 select-none"
						}
					/>
				</Link>
				<h2 className="mb-4 mt-8 font-bold text-xl text-gray-800 hover:text-black capitalize dark:text-gray-100">
					<Link to={`/pokemon/${pokemonCard.id}`}>{pokemonCard.name}</Link>
				</h2>
				<div className="flex">
					<div
						className={`leading-none me-2 text-xs font-medium mr-2 px-3 pt-2.5 pb-2 rounded-md ${resPriType}`}
					>
						{priType}
					</div>
					<div
						className={`leading-none me-2 text-xs font-medium mr-2 px-3 pt-2.5 pb-2 rounded-md ${resSecType}`}
					>
						{secType}
					</div>
				</div>
			</div>
		</>
	);
}

export default Card;
