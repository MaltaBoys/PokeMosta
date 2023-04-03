import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaWeightHanging, FaRulerVertical } from "react-icons/fa";

function CardDetail() {
	// State to store the data and the species of the Pokemon
	const [pokemonCard, setPokemonCard] = useState(null);
	const [pokemonSpecies, setPokemonSpecies] = useState(null);

	// States to store the search data by the ID parameter
	let params = useParams();
	const pokemonID = params.id;

	// We connect to the api to collect the data in JSON
	useEffect(() => {
		fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
			.then((response) => response.json())
			.then((data) => {
				setPokemonCard(data);
			});
	}, [pokemonID]);

	useEffect(() => {
		if (pokemonCard) {
			fetch(pokemonCard.species.url)
				.then((response) => response.json())
				.then((data) => {
					setPokemonSpecies(data);
				});
		}
	}, [pokemonCard]);

	// Si no tenemos los datos, mostramos un mensaje de carga
	if (!pokemonCard) {
		return <p>No pokemon detail</p>;
	}

	let description = "";
	if (pokemonSpecies && pokemonSpecies.flavor_text_entries.length > 0) {
		description = pokemonSpecies.flavor_text_entries[1].flavor_text;
	} else {
		description = "Not a description";
	}

	let category = "";
	if (pokemonSpecies && pokemonSpecies.genera.length > 0) {
		category = pokemonSpecies.genera[7].genus;
	} else {
		category = "Any category";
	}
	let growthRate = "";
	if (pokemonSpecies) {
		growthRate = pokemonSpecies.growth_rate.name;
	}

	// We keep the types of pokemon that there are (two maximum)
	const abilities = pokemonCard.abilities
		.map((ability) => ability.ability.name)
		.join(", ");
	const hiddenAbility = pokemonCard.abilities.find(
		(ability) => ability.is_hidden
	);
	function Stat({ quantity }) {
		const statElements = [];

		for (let i = 0; i < 15; i++) {
			if (quantity > i) {
				statElements.push(
					<div
						key={i}
						className="w-full h-1.5 mb-4 rounded-full dark:bg-red-600"
					></div>
				);
			} else {
				statElements.push(
					<div
						key={i}
						className="w-full h-1.5 mb-4 rounded-full dark:bg-gray-600"
					></div>
				);
			}
		}

		return <>{statElements.reverse()}</>;
	}

	/* function peo() {
		let a = "";
		for (let i = 0; i < 6; i++) {
			let statName = pokemonCard.stats[i].stat.name.toUpperCase();
			a = (
				<div className="flex flex-col">
					{Stat(pokemonCard.stats.base_stat / 17)}
					<h3 className="dark:text-white text-center">{statName}</h3>
				</div>
			);
		}
		return a;
	} */
	function Peo(pokemonCard) {
		const statElements = [];

		for (let i = 0; i < 6; i++) {
			const statName = pokemonCard.stats[i].stat.name.toUpperCase();
			const statValue = pokemonCard.stats[i].base_stat / 17;
			statElements.push(
				<div key={i} className="flex flex-col">
					<Stat quantity={statValue} />
					<h3 className="dark:text-white text-center">{statName}</h3>
				</div>
			);
		}

		return <div className="flex flex-row gap-2">{statElements}</div>;
	}

	return (
		<>
			<div className="w-full mx-auto lg:grid lg:grid-cols-5 p-4 gap-4 mb-4">
				<div className="shadow-lg shadow-gray-300 dark:shadow-xl dark:shadow-gray-900 overflow-hidden relative col-span-2 bg-gray-50 dark:bg-gray-800 rounded-xl pb-4 flex justify-center items-center">
					<div className="absolute top-4 right-4 left-4 z-20">
						<Link
							to="/pokedex"
							type="button"
							class="cursor-pointer shadow-xl shadow-gray-400 dark:shadow-gray-900 text-white dark:text-black bg-gray-700 dark:bg-white hover:bg-gray-500 dark:hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
						>
							<svg
								aria-hidden="true"
								class="w-4 h-4 rotate-180"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
									clip-rule="evenodd"
								></path>
							</svg>
							<span class="sr-only">Back</span>
						</Link>
					</div>
					<img
						src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonCard.id}.png`}
						alt={pokemonCard.name}
						className="absolute top-0 left-0 blur-3xl z-0"
					/>
					<img
						src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonCard.id}.png`}
						alt={pokemonCard.name}
						className="z-10"
					/>
				</div>
				<div className="col-span-3 pt-4">
					<div className="flex justify-between mb-4">
						<h1 className="text-5xl font-extrabold capitalize dark:text-white">
							{pokemonCard.name}
						</h1>
						<p className="dark:text-gray-700 font-black text-6xl">
							#
							{pokemonCard.id < 10
								? "00" + pokemonCard.id
								: pokemonCard.id < 100
								? "0" + pokemonCard.id
								: pokemonCard.id}
						</p>
					</div>
					<div className="flex flex-col dark:text-white">
						<p className="font-bold text-xl mb-2">Description</p>
						<p className="font-light text-lg max-w-xl">{description}</p>
					</div>
					<div className="grid grid-cols-3 my-8">
						<div className="flex items-stretch">
							<div className="dark:bg-gray-800 rounded-full inline-flex items-center p-5 me-4">
								<FaWeightHanging className="dark:text-white text-2xl" />
							</div>
							<div className="flex flex-col justify-between">
								<p className="text-md font-regular dark:text-gray-500">
									Weight
								</p>
								<p className="text-2xl font-bold dark:text-white">
									{pokemonCard.weight} KG
								</p>
							</div>
						</div>
						<div className="flex items-stretch">
							<div className="dark:bg-gray-800 rounded-full inline-flex items-center p-5 me-4">
								<FaRulerVertical className="dark:text-white text-2xl" />
							</div>
							<div className="flex flex-col justify-between">
								<p className="text-md font-regular dark:text-gray-500">
									Height
								</p>
								<p className="text-2xl font-bold dark:text-white">
									{pokemonCard.height} CM
								</p>
							</div>
						</div>
						<div className="flex items-stretch">
							<div className="dark:bg-gray-800 rounded-full inline-flex items-center p-5 me-4">
								<FaRulerVertical className="dark:text-white text-2xl" />
							</div>
							<div className="flex flex-col justify-between">
								<p className="text-md font-regular dark:text-gray-500">
									Category
								</p>
								<p className="text-2xl font-bold dark:text-white">
									{category.replace(/Pokémon/gi, "")}
								</p>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-3 my-8">
						<div className="flex flex-col">
							<p className="text-md font-regular dark:text-gray-500 mb-2">
								Ability
							</p>
							<p className="text-md font-semibold dark:text-white capitalize">
								{abilities}
							</p>
						</div>
						<div className="flex flex-col">
							<p className="text-md font-regular dark:text-gray-500 mb-2">
								Hidden Ability
							</p>
							<p className="text-md font-semibold dark:text-white capitalize">
								{hiddenAbility ? hiddenAbility.ability.name : "None"}
							</p>
						</div>
						<div className="flex flex-col">
							<p className="text-md font-regular dark:text-gray-500 mb-2">
								Type
							</p>
							<p className="text-md font-semibold dark:text-white capitalize">
								{"WIP"}
							</p>
						</div>
						<div className="flex flex-col">
							<p className="text-md font-regular dark:text-gray-500 mb-2">
								Hatch Time
							</p>
							<p className="text-md font-semibold dark:text-white capitalize">
								{pokemonSpecies
									? pokemonSpecies.hatch_counter * 255 + " Steps"
									: "None"}
							</p>
						</div>
						<div className="flex flex-col">
							<p className="text-md font-regular dark:text-gray-500 mb-2">
								Growth Rate
							</p>
							<p className="text-md font-semibold dark:text-white capitalize">
								{growthRate}
							</p>
							{/* - Erratic: 600,000 exp at level 100
                  - Fast: 800,000 exp at level 100
                  - medium fast: 1,000,000 exp at level 100
                  - medium slow: 1,059,860 exp at level 100
                  - slow: 1,250,000 exp at level 100
                  - Fluctuating: 1,640,000 exp at level 100 */}
						</div>
						<div className="flex flex-col">
							<p className="text-md font-regular dark:text-gray-500 mb-2">
								Weaknesses
							</p>
							<p className="text-md font-semibold dark:text-white capitalize">
								{"WIP"}
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full mx-auto lg:grid lg:grid-cols-5 p-4 gap-4">
				<div className="overflow-hidden relative col-span-2">
					<h2 className="text-2xl font-semibold dark:text-white mb-4">Stats</h2>
					<div className="shadow-lg shadow-gray-300 dark:shadow-xl dark:shadow-gray-900 bg-gray-50 dark:bg-gray-800 rounded-xl grid grid-cols-6 gap-4 py-6 px-4">
						{Peo(pokemonCard)}
					</div>
				</div>
				<div className="overflow-hidden relative col-span-3">
					<h2 className="text-2xl font-semibold dark:text-white mb-4">
						Evolution Line
					</h2>
					<div className="shadow-lg shadow-gray-300 dark:shadow-xl dark:shadow-gray-900 bg-gray-50 dark:bg-gray-800 rounded-xl flex justify-center items-center">
						B
					</div>
				</div>
			</div>
		</>
	);
}

export default CardDetail;
