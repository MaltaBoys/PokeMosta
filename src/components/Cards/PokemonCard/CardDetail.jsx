import React, { useEffect, useState } from "react";
import axios from "axios";
// Icons
import { Link, useParams } from "react-router-dom";
import { FaWeightHanging, FaRulerVertical, FaStar } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";

function CardDetail() {
	// State to store the data and the species of the Pokemon
	const [pokemonCard, setPokemonCard] = useState(null);
	const [pokemonSpecies, setPokemonSpecies] = useState(null);
	const [weaknesses, setWeaknesses] = useState([]);
	const [evolutionChain, setEvolutionChain] = useState([]);
	const [isHidden1, setIsHidden1] = useState(false);
	const [isHidden2, setIsHidden2] = useState(true);
	const [color, setColor] = useState("#4B5563");
	const [clicked, setClicked] = useState(false);

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

	useEffect(() => {
		if (pokemonSpecies) {
			fetch(pokemonSpecies.evolution_chain.url)
				.then((response) => response.json())
				.then((data) => {
					setEvolutionChain(data.chain);
				})
				.catch((error) => console.error(error));
		}
	}, [pokemonSpecies]);
	/**
	 ** Pokemon Type Rules to Print or not the type weaknes
	 *
	 *? If the pokemon only have One Type -> Print All weaknesses
	 *
	 *? If the pokemon have 2 types :
	 *
	 *! If the attacker type is super efective to both pokemon types -> Print the attacker type
	 *
	 *! If the attacker type is super efective to one and is not super efective to the other but is not weak aganist -> Print the attacker type
	 *
	 *! If the attacker type is super efective to one and week aganist the other -> Don't print the attacker type
	 */
	useEffect(() => {
		axios
			.get(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
			.then((response) => {
				const types = response.data.types.map((type) => type.type.name);
				if (types.length === 1) {
					axios
						.get(`https://pokeapi.co/api/v2/type/${types[0]}`)
						.then((response) => {
							const weaknesses =
								response.data.damage_relations.double_damage_from.map(
									(weakness) => weakness.name
								);
							setWeaknesses(
								weaknesses.filter(
									(weakness) =>
										!response.data.damage_relations.no_damage_from
											.map((noDamage) => noDamage.name)
											.includes(weakness) &&
										!response.data.damage_relations.half_damage_from
											.map((halfDamage) => halfDamage.name)
											.includes(weakness)
								)
							);
						})
						.catch((error) => console.log(error));
				} else {
					axios
						.get(`https://pokeapi.co/api/v2/type/${types[0]}`)
						.then((response1) => {
							axios
								.get(`https://pokeapi.co/api/v2/type/${types[1]}`)
								.then((response2) => {
									const weaknesses1 =
										response1.data.damage_relations.double_damage_from.map(
											(weakness) => weakness.name
										);
									const weaknesses2 =
										response2.data.damage_relations.double_damage_from.map(
											(weakness) => weakness.name
										);
									const bothTypesWeaknesses = weaknesses1
										.filter((weakness) => weaknesses2.includes(weakness))
										.filter(
											(weakness) =>
												!response1.data.damage_relations.no_damage_from
													.map((noDamage) => noDamage.name)
													.includes(weakness) &&
												!response2.data.damage_relations.no_damage_from
													.map((noDamage) => noDamage.name)
													.includes(weakness) &&
												!response1.data.damage_relations.half_damage_from
													.map((halfDamage) => halfDamage.name)
													.includes(weakness) &&
												!response2.data.damage_relations.half_damage_from
													.map((halfDamage) => halfDamage.name)
													.includes(weakness)
										);
									const superEffective1Weaknesses = weaknesses1
										.filter((weakness) => !weaknesses2.includes(weakness))
										.filter(
											(weakness) =>
												!response1.data.damage_relations.no_damage_from
													.map((noDamage) => noDamage.name)
													.includes(weakness) &&
												!response2.data.damage_relations.half_damage_from
													.map((halfDamage) => halfDamage.name)
													.includes(weakness)
										);
									const superEffective2Weaknesses = weaknesses2
										.filter((weakness) => !weaknesses1.includes(weakness))
										.filter(
											(weakness) =>
												!response2.data.damage_relations.no_damage_from
													.map((noDamage) => noDamage.name)
													.includes(weakness) &&
												!response1.data.damage_relations.half_damage_from
													.map((halfDamage) => halfDamage.name)
													.includes(weakness)
										);
									const weaknesses = [
										...bothTypesWeaknesses,
										...superEffective1Weaknesses,
										...superEffective2Weaknesses,
									];
									setWeaknesses(weaknesses);
								})
								.catch((error) => console.log(error));
						})
						.catch((error) => console.log(error));
				}
			})
			.catch((error) => console.log(error));
	}, [pokemonID]);
	// Si no tenemos los datos, mostramos un mensaje de carga
	if (!pokemonCard) {
		return <p>No pokemon detail</p>;
	}
	const pokemonImage =
		"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/" +
		pokemonCard.id +
		".png";
	const pokemonShinyImage =
		"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/" +
		pokemonCard.id +
		".png";
	const toggleDivs = () => {
		if (!clicked) {
			setColor("#FFFF00");
		} else {
			setColor("#4B5563");
		}
		setIsHidden1(!isHidden1);
		setIsHidden2(!isHidden2);
		setClicked(!clicked);
	};
	// Get the description
	let description = "";
	if (pokemonSpecies && pokemonSpecies.flavor_text_entries.length > 0) {
		description = pokemonSpecies.flavor_text_entries[1].flavor_text;
	} else {
		description = "Not a description";
	}

	// Get the category
	let category = "";
	if (pokemonSpecies && pokemonSpecies.genera.length > 0) {
		pokemonSpecies.genera.forEach((genera) => {
			if (genera.language && genera.language.name == "en") {
				category = genera.genus;
			}
		});
		if (category == "") {
			category = pokemonSpecies.genera[0].genus;
		}
	} else {
		category = "Any category";
	}

	/* 	console.log(category, "ESTA ES LA CATEGORIA DEL POKEMON");
	 */ // Get growth rate
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

	// A functions for get the stats
	function Stat({ quantity }) {
		const statElements = [];

		for (let i = 0; i < 15; i++) {
			if (quantity > i) {
				statElements.push(
					<div
						key={i}
						className="w-full h-1 mb-4 rounded-full dark:bg-red-600 bg-yellow-200 "
					></div>
				);
			} else {
				statElements.push(
					<div
						key={i}
						className="w-full h-1 mb-4 rounded-full dark:bg-gray-600 bg-gray-400"
					></div>
				);
			}
		}

		return <>{statElements.reverse()}</>;
	}

	function EntireStat(pokemonCard) {
		const statElements = [];

		for (let i = 0; i < 6; i++) {
			const statNamePure = pokemonCard.stats[i].stat.name;
			const statName =
				statNamePure.charAt(0).toUpperCase() + statNamePure.slice(1);

			const statValue = pokemonCard.stats[i].base_stat / 17;

			statElements.push(
				<div key={i}>
					<Stat quantity={statValue} />
					<h3 className="dark:text-gray-300 text-center text-sm">{statName}</h3>
				</div>
			);
		}

		return <div className="grid grid-cols-6 gap-4">{statElements}</div>;
	}
	// We keep the types of pokemon that there are (two maximum)
	const types = pokemonCard.types.map((type) => type.type.name);
	const priType = types[0];
	const secType = types[1] || null;

	// We keep the weaknesses of pokemon that there are (eight maximum)
	const weakTypes = weaknesses.map((weakness) => weakness);

	// Array of styles for each type and weakness of Pokemon
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

	// We get the corresponding style of the first and second types and weaknesses of Pokemon or an empty string if it hasn't been found
	const resPriType = typesStyleSheet[priType] || "";
	const resSecType = typesStyleSheet[secType] || "";

	// We take out the weaknesses of each pokemon
	function PrintWeaknesses(weakTypes) {
		const weaknessesDiv = [];

		weakTypes.forEach((element) => {
			weaknessesDiv.push(
				<div
					className={`leading-none me-2 text-xs font-medium px-3 pt-2.5 pb-2 rounded-md ${typesStyleSheet[element]}`}
				>
					{element.charAt(0).toUpperCase() + element.slice(1)}
				</div>
			);
		});

		return <>{weaknessesDiv}</>;
	}

	// We get the image of the pokemon depending on its evolution
	function getEvoImage(imgsource) {
		// We take the pokemon ID
		const url = imgsource.species.url;
		const regex = /(\d+)\/$/;
		const numberId = url.match(regex)[1];
		const stringImgPoke = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${numberId}.png`;

		return (
			<img
				src={stringImgPoke}
				alt="PokemonChainImage"
				className="p-4 dark:bg-gray-700 rounded-full overflow-visible z-10"
			/>
		);
	}
	//Get the Evolutoin details
	function getEvoDetails(evolution) {
		let itemEvo = false;
		let itemImg = "";
		let itemTrade = false;
		let itemTradeImg = "";

		const details = evolution.evolution_details.map((detail) => {
			if (detail.min_level) {
				return `Lvl ${detail.min_level}`;
			} else if (detail.item) {
				itemEvo = true;
				itemImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${detail.item.name}.png`;
				const itemName = detail.item.name;
				const formattedName = itemName
					.split("-")
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(" ");
				return formattedName;
			} else if (detail.held_item) {
				itemTrade = true;
				itemTradeImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${detail.held_item.name}.png`;
				const itemName = detail.held_item.name;
				const formattedName = itemName
					.split("-")
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(" ");
				return formattedName;
			} else if (detail.min_happiness) {
				return `Hpns ${detail.min_happiness}`;
			} else if (detail.location) {
				return detail.location.name;
			} else if (detail.known_move) {
				return detail.known_move.name;
			} else if (detail.trigger) {
				return detail.trigger.name;
			} else {
				return "Unknown";
			}
		});

		return {
			details: details,
			itemEvo: itemEvo,
			itemImg: itemImg,
			itemTrade: itemTrade,
			itemTradeImg: itemTradeImg,
		};
	}
	//Get the evolution ID
	function getEvoId(imgsource) {
		const url = imgsource.species.url;
		const regex = /(\d+)\/$/;
		const numberId = url.match(regex)[1];
		return numberId;
	}
	// Print the evolution line
	function PrintEvolutionChain(evolutionChain) {
		const chain = [];
		let numFirstEvolutions = 0;
		let numSecondEvolutions = 0;
		if (evolutionChain.evolves_to && Array.isArray(evolutionChain.evolves_to)) {
			numFirstEvolutions = evolutionChain.evolves_to.length;
			console.log(
				`El pokemon tiene ${numFirstEvolutions} primeras evoluciones.`
			);
			evolutionChain.evolves_to.forEach((evolution) => {
				if (evolution.evolves_to && Array.isArray(evolution.evolves_to)) {
					numSecondEvolutions = evolution.evolves_to.length;
					console.log(
						`El pokemon tiene ${numSecondEvolutions} segundas evoluciones.`
					);
				} else {
					console.log(`El pokemon no tiene segundas evoluciones.`);
				}
			});
		} else {
			console.log(`El pokemon no tiene evoluciones.`);
		}
		/**
		 ** TIPOS DE EVOLUCION
		 *? 0 -> Sin Evoluciones Palkia
		 *? 1 -> Evolución corta, una primera y cero segundas Snover
		 *? 2 -> Línea normal, una primera y una segunda Larvitar
		 *? 3 -> Una primera y dos segundas Poliwag
		 *? 4 -> Dos primeras, cero segundas Snorunt O Tres primeras, cero segundas Tyrogue
		 *? 5 -> Dos primera y una o dos segundas Wurmple
		 *? 6 -> Eevee
		 *
		 * TODO HACER UN SWITCH PARA SEGÚN EL TIPO DE LÍNEA PINTAR UNA COSA U OTRA
		 */
		let evolutionChainType = -1;
		if (numFirstEvolutions === 0) {
			evolutionChainType = 0;
		} else if (numFirstEvolutions === 1 && numSecondEvolutions === 0) {
			evolutionChainType = 1;
		} else if (numFirstEvolutions === 1 && numSecondEvolutions === 1) {
			evolutionChainType = 2;
		} else if (numFirstEvolutions === 1 && numSecondEvolutions === 2) {
			evolutionChainType = 3;
		} else if (
			(numFirstEvolutions === 2 || numFirstEvolutions === 3) &&
			numSecondEvolutions === 0
		) {
			evolutionChainType = 4;
		} else if (
			numFirstEvolutions === 2 &&
			(numSecondEvolutions === 2 || numSecondEvolutions === 1)
		) {
			evolutionChainType = 5;
		} else if (numFirstEvolutions === 8) {
			evolutionChainType = 6;
		}
		console.log("Tipo de evolución: ", evolutionChainType);
		if (evolutionChain.species) {
			chain.push(
				<Link
					to={`/pokemon/${getEvoId(evolutionChain)}`}
					className="col-span-2 flex flex-col items-center justify-center"
				>
					<div>
						{getEvoImage(evolutionChain)}
						<p className="dark:text-gray-200 capitalize font-semibold mt-4 text-center">
							{evolutionChain.species.name}&nbsp;
							<span className="dark:text-gray-400 font-medium">
								#
								{getEvoId(evolutionChain) < 10
									? "00" + getEvoId(evolutionChain)
									: getEvoId(evolutionChain) < 100
									? "0" + getEvoId(evolutionChain)
									: getEvoId(evolutionChain)}
							</span>
						</p>
					</div>
				</Link>
			);
		}
		switch (evolutionChainType) {
			case 0:
				return <>{chain}</>;
			case 1:
				if (evolutionChain.evolves_to) {
					evolutionChain.evolves_to.map((evolution) => {
						const { details, itemEvo, itemImg, itemTrade, itemTradeImg } =
							getEvoDetails(evolution);

						chain.push(
							<>
								<div className="relative flex flex-col col-span-4 items-center justify-center">
									<p className="absolute dark:text-gray-400 font-medium text-sm top-1/4">
										{details}
									</p>
									<div className="w-full mb-8 border-dashed border-2 border-gray-50"></div>
								</div>
								<Link
									to={`/pokemon/${getEvoId(evolution)}`}
									className="col-span-2 flex flex-col items-center justify-center"
								>
									<div key={evolution.species.name}>
										{itemEvo ? <img src={itemImg} alt="Item" /> : ""}
										{itemTrade ? <img src={itemTradeImg} alt="Item" /> : ""}
										{getEvoImage(evolution)}
										<p className="dark:text-gray-200 capitalize font-semibold mt-4 text-center">
											{evolution.species.name}&nbsp;
											<span className="dark:text-gray-400 font-medium">
												#
												{getEvoId(evolution) < 10
													? "00" + getEvoId(evolution)
													: getEvoId(evolution) < 100
													? "0" + getEvoId(evolution)
													: getEvoId(evolution)}
											</span>
										</p>
									</div>
								</Link>
							</>
						);
					});
				}
				return <>{chain}</>;
			case 2:
				//First Evolution
				if (evolutionChain.evolves_to) {
					evolutionChain.evolves_to.map((evolution) => {
						const { details, itemEvo, itemImg, itemTrade, itemTradeImg } =
							getEvoDetails(evolution);

						chain.push(
							<>
								<div className="relative flex flex-col items-center justify-center">
									<p className="absolute dark:text-gray-400 font-medium text-sm top-1/4">
										{details}
									</p>
									<div className="w-full mb-8 border-dashed border-2 border-gray-50"></div>
								</div>
								<Link
									to={`/pokemon/${getEvoId(evolution)}`}
									className="col-span-2 flex flex-col items-center justify-center"
								>
									<div key={evolution.species.name}>
										{itemEvo ? <img src={itemImg} alt="Item" /> : ""}
										{itemTrade ? <img src={itemTradeImg} alt="Item" /> : ""}
										{getEvoImage(evolution)}
										<p className="dark:text-gray-200 capitalize font-semibold mt-4 text-center">
											{evolution.species.name}&nbsp;
											<span className="dark:text-gray-400 font-medium">
												#
												{getEvoId(evolution) < 10
													? "00" + getEvoId(evolution)
													: getEvoId(evolution) < 100
													? "0" + getEvoId(evolution)
													: getEvoId(evolution)}
											</span>
										</p>
									</div>
								</Link>
							</>
						);
						//Second Evolution
						if (evolution.evolves_to) {
							evolution.evolves_to.map((evolution) => {
								const { details, itemEvo, itemImg, itemTrade, itemTradeImg } =
									getEvoDetails(evolution);
								chain.push(
									<>
										<div className="relative flex flex-col items-center justify-center">
											<p className="absolute dark:text-gray-400 font-medium text-sm top-1/4">
												{details}
											</p>
											<div className="w-full mb-8 border-dashed border-2 border-gray-50"></div>
										</div>
										<Link
											to={`/pokemon/${getEvoId(evolution)}`}
											className="col-span-2 flex flex-col items-center justify-center"
										>
											<div key={evolution.species.name}>
												{itemEvo ? <img src={itemImg} alt="Item" /> : ""}
												{itemTrade ? <img src={itemTradeImg} alt="Item" /> : ""}
												{getEvoImage(evolution)}
												<p className="dark:text-gray-200 capitalize font-semibold mt-4 text-center">
													{evolution.species.name}&nbsp;
													<span className="dark:text-gray-400 font-medium">
														#
														{getEvoId(evolution) < 10
															? "00" + getEvoId(evolution)
															: getEvoId(evolution) < 100
															? "0" + getEvoId(evolution)
															: getEvoId(evolution)}
													</span>
												</p>
											</div>
										</Link>
									</>
								);
							});
						}
					});
				}
				return <>{chain}</>;
			case 3:
				//First Evolution
				if (evolutionChain.evolves_to) {
					evolutionChain.evolves_to.forEach((evolution) => {
						const { details, itemEvo, itemImg, itemTrade, itemTradeImg } =
							getEvoDetails(evolution);

						chain.push(
							<>
								<div className="relative flex flex-col items-center justify-center">
									<p className="absolute dark:text-gray-400 font-medium text-sm top-1/4 text-center">
										{details}
									</p>
									<div className="w-full mb-8 border-dashed border-2 border-gray-50"></div>
								</div>
								<Link
									to={`/pokemon/${getEvoId(evolution)}`}
									className="col-span-2 flex flex-col items-center justify-center z-10"
								>
									<div key={evolution.species.name}>
										{itemEvo ? <img src={itemImg} alt="Item" /> : ""}
										{itemTrade ? <img src={itemTradeImg} alt="Item" /> : ""}
										{getEvoImage(evolution)}
										<p className="dark:text-gray-200 capitalize font-semibold mt-4 text-center">
											{evolution.species.name}&nbsp;
											<span className="dark:text-gray-400 font-medium">
												#
												{getEvoId(evolution) < 10
													? "00" + getEvoId(evolution)
													: getEvoId(evolution) < 100
													? "0" + getEvoId(evolution)
													: getEvoId(evolution)}
											</span>
										</p>
									</div>
								</Link>
							</>
						);
						//Second Evolution
						if (evolution.evolves_to) {
							const evolutionContent = evolution.evolves_to.map((evolution) => {
								const { details, itemEvo, itemImg, itemTrade, itemTradeImg } =
									getEvoDetails(evolution);
								return (
									<>
										<div className="relative flex flex-col items-center justify-center">
											<p className="absolute dark:text-gray-400 font-medium text-sm -left-20 top-28 text-center w-10">
												{details}
											</p>
										</div>
										<Link
											to={`/pokemon/${getEvoId(evolution)}`}
											className="relative col-span-2 flex flex-col items-center justify-center z-40 mb-10"
										>
											<div key={evolution.species.name}>
												<p className="absolute -left-20 top-20">
													{itemEvo ? <img src={itemImg} alt="Item" /> : ""}
												</p>
												<p className="absolute -left-20 top-20">
													{itemTrade ? (
														<img src={itemTradeImg} alt="Item" />
													) : (
														""
													)}
												</p>
												{getEvoImage(evolution)}
												<p className="dark:text-gray-200 capitalize font-semibold mt-4 text-center">
													{evolution.species.name}&nbsp;
													<span className="dark:text-gray-400 font-medium">
														#
														{getEvoId(evolution) < 10
															? "00" + getEvoId(evolution)
															: getEvoId(evolution) < 100
															? "0" + getEvoId(evolution)
															: getEvoId(evolution)}
													</span>
												</p>
											</div>
										</Link>
									</>
								);
							});
							chain.push(
								<>
									<div className="flex flex-col items-center justify-center mb-14">
										<div className="w-40 border-dashed border-2 border-gray-50 h-1 -rotate-45 mb-20 z-0"></div>
										<div className="w-40 border-dashed border-2 border-gray-50 h-1 rotate-45 mt-10 z-0"></div>
									</div>
									<div className="col-span-2 z-40">{evolutionContent}</div>
								</>
							);
						}
					});
				}
				return <>{chain}</>;
			case 4:
				//First Evolution
				if (evolutionChain.evolves_to) {
					const evolutionContent = evolutionChain.evolves_to.map(
						(evolution) => {
							const { details, itemEvo, itemImg, itemTrade, itemTradeImg } =
								getEvoDetails(evolution);
							return (
								<>
									<div className="grid-cols-1">
										{details}
										<div className="w-full h-2 dark:bg-gray-50"></div>
									</div>
									<Link
										to={`/pokemon/${getEvoId(evolution)}`}
										className="grid-cols-2"
									>
										<div key={evolution.species.name}>
											{itemEvo ? <img src={itemImg} alt="Item" /> : ""}
											{itemTrade ? <img src={itemTradeImg} alt="Item" /> : ""}
											{getEvoImage(evolution)}
											<p className="dark:text-gray-200 capitalize font-semibold mt-4 text-center">
												{evolution.species.name}&nbsp;
												<span className="dark:text-gray-400 font-medium">
													#
													{getEvoId(evolution) < 10
														? "00" + getEvoId(evolution)
														: getEvoId(evolution) < 100
														? "0" + getEvoId(evolution)
														: getEvoId(evolution)}
												</span>
											</p>
										</div>
									</Link>
								</>
							);
						}
					);
					chain.push(<div className="divs_juntos">{evolutionContent}</div>);
				}
				return <>{chain}</>;
			case 5:
				if (evolutionChain.evolves_to) {
					const evolutionContent = evolutionChain.evolves_to.map(
						(evolution) => {
							const { details, itemEvo, itemImg, itemTrade, itemTradeImg } =
								getEvoDetails(evolution);
							return (
								<>
									<div className="grid-cols-1">
										{details}
										<div className="w-full h-2 dark:bg-gray-50"></div>
									</div>
									<Link
										to={`/pokemon/${getEvoId(evolution)}`}
										className="grid-cols-2"
									>
										<div key={evolution.species.name}>
											{itemEvo ? <img src={itemImg} alt="Item" /> : ""}
											{itemTrade ? <img src={itemTradeImg} alt="Item" /> : ""}
											{getEvoImage(evolution)}
											<p className="dark:text-gray-200 capitalize font-semibold mt-4text-center">
												{evolution.species.name}&nbsp;
												<span className="dark:text-gray-400 font-medium">
													#
													{getEvoId(evolution) < 10
														? "00" + getEvoId(evolution)
														: getEvoId(evolution) < 100
														? "0" + getEvoId(evolution)
														: getEvoId(evolution)}
												</span>
											</p>
										</div>
									</Link>
								</>
							);
						}
					);
					chain.push(<div className="divs_juntos">{evolutionContent}</div>);
					//Second Evolution
					if (evolutionChain.evolves_to) {
						const evolutionContent = evolutionChain.evolves_to.map(
							(evolution) => {
								return evolution.evolves_to.map((evolution) => {
									const { details, itemEvo, itemImg, itemTrade, itemTradeImg } =
										getEvoDetails(evolution);
									return (
										<>
											<div className="grid-cols-1">
												{details}
												<div className="w-full h-2 dark:bg-gray-50"></div>
											</div>
											<Link
												to={`/pokemon/${getEvoId(evolution)}`}
												className="grid-cols-2"
											>
												<div key={evolution.species.name}>
													{itemEvo ? <img src={itemImg} alt="Item" /> : ""}
													{itemTrade ? (
														<img src={itemTradeImg} alt="Item" />
													) : (
														""
													)}
													{getEvoImage(evolution)}
													<p className="dark:text-gray-200 capitalize font-semibold mt-4 text-center">
														{evolution.species.name}&nbsp;
														<span className="dark:text-gray-400 font-medium">
															#
															{getEvoId(evolution) < 10
																? "00" + getEvoId(evolution)
																: getEvoId(evolution) < 100
																? "0" + getEvoId(evolution)
																: getEvoId(evolution)}
														</span>
													</p>
												</div>
											</Link>
										</>
									);
								});
							}
						);
						chain.push(<div className="divs_juntos">{evolutionContent}</div>);
					}
				}
				return <>{chain}</>;
			case 6:
				//First Evolution
				if (evolutionChain.evolves_to) {
					const evolutionContent = evolutionChain.evolves_to.map(
						(evolution) => {
							const { details, itemEvo, itemImg, itemTrade, itemTradeImg } =
								getEvoDetails(evolution);
							return (
								<>
									<div className="grid-cols-1">
										{details}
										<div className="w-full h-2 dark:bg-gray-50"></div>
									</div>
									<Link
										to={`/pokemon/${getEvoId(evolution)}`}
										className="grid-cols-2"
									>
										<div key={evolution.species.name}>
											{itemEvo ? <img src={itemImg} alt="Item" /> : ""}
											{itemTrade ? <img src={itemTradeImg} alt="Item" /> : ""}
											{getEvoImage(evolution)}
											<p className="dark:text-gray-200 capitalize font-semibold mt-4 text-center">
												{evolution.species.name}&nbsp;
												<span className="dark:text-gray-400 font-medium">
													#
													{getEvoId(evolution) < 10
														? "00" + getEvoId(evolution)
														: getEvoId(evolution) < 100
														? "0" + getEvoId(evolution)
														: getEvoId(evolution)}
												</span>
											</p>
										</div>
									</Link>
								</>
							);
						}
					);
					chain.push(<div className="divs_juntos">{evolutionContent}</div>);
				}
				return <>{chain}</>;
			default:
				//First Evolution
				if (evolutionChain.evolves_to) {
					evolutionChain.evolves_to.forEach((evolution) => {
						const { details, itemEvo, itemImg, itemTrade, itemTradeImg } =
							getEvoDetails(evolution);

						chain.push(
							<>
								<div className="relative flex flex-col items-center justify-center">
									<p className="absolute dark:text-gray-400 font-medium text-sm top-1/4">
										{details}
									</p>
									<div className="w-full mb-8 border-dashed border-2 border-gray-50"></div>
								</div>
								<Link
									to={`/pokemon/${getEvoId(evolution)}`}
									className="col-span-2 flex flex-col items-center justify-center"
								>
									<div key={evolution.species.name}>
										{itemEvo ? <img src={itemImg} alt="Item" /> : ""}
										{itemTrade ? <img src={itemTradeImg} alt="Item" /> : ""}
										{getEvoImage(evolution)}
										<p className="dark:text-gray-200 capitalize font-semibold mt-4 text-center">
											{evolution.species.name}&nbsp;
											<span className="dark:text-gray-400 font-medium">
												#
												{getEvoId(evolution) < 10
													? "00" + getEvoId(evolution)
													: getEvoId(evolution) < 100
													? "0" + getEvoId(evolution)
													: getEvoId(evolution)}
											</span>
										</p>
									</div>
								</Link>
							</>
						);
						//Second Evolution
						if (evolution.evolves_to) {
							evolution.evolves_to.forEach((evolution) => {
								const { details, itemEvo, itemImg, itemTrade, itemTradeImg } =
									getEvoDetails(evolution);

								chain.push(
									<>
										<div className="grid-cols-1">
											{details}
											<div className="w-full h-2 dark:bg-gray-50"></div>
										</div>
										<Link
											to={`/pokemon/${getEvoId(evolution)}`}
											className="grid-cols-2"
										>
											<div key={evolution.species.name}>
												{itemEvo ? <img src={itemImg} alt="Item" /> : ""}
												{itemTrade ? <img src={itemTradeImg} alt="Item" /> : ""}
												{getEvoImage(evolution)}
												<p className="dark:text-gray-200 capitalize font-semibold mt-4 text-center">
													{evolution.species.name}&nbsp;
													<span className="dark:text-gray-400 font-medium">
														#
														{getEvoId(evolution) < 10
															? "00" + getEvoId(evolution)
															: getEvoId(evolution) < 100
															? "0" + getEvoId(evolution)
															: getEvoId(evolution)}
													</span>
												</p>
											</div>
										</Link>
									</>
								);
							});
						}
					});
				}

				return <>{chain}</>;
		}
	}

	return (
		<>
			<div className="w-full mx-auto lg:grid lg:grid-cols-5 p-4 gap-4 mb-4">
				<div className="shadow-xl overflow-hidden relative col-span-2 bg-white dark:bg-gray-800 rounded-xl pb-4 flex justify-center items-center">
					<div className="absolute top-4 right-4 left-4 z-20 flex justify-between items-center">
						<Link
							to="/pokedex"
							type="button"
							className="cursor-pointer shadow-xl text-white dark:text-black bg-gray-700 dark:bg-white hover:bg-gray-500 dark:hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
						>
							<svg
								aria-hidden="true"
								className="w-4 h-4 rotate-180"
								fillRule="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
									clipRule="evenodd"
								></path>
							</svg>
							<span className="sr-only">Back</span>
						</Link>
						<FaStar
							onClick={toggleDivs}
							className="transition text-4xl cursor-pointer"
							style={{ color: color }}
						/>
					</div>
					<img
						src={pokemonImage}
						alt={pokemonCard.name}
						className={
							isHidden1
								? "hidden absolute top-0 blur-3xl z-0 select-none"
								: "absolute top-0 blur-3xl z-0 select-none"
						}
					/>
					<img
						src={pokemonImage}
						alt={pokemonCard.name}
						className={
							isHidden1 ? "hidden z-10 select-none" : "z-10 select-none"
						}
					/>
					<img
						src={pokemonShinyImage}
						alt={pokemonCard.name}
						className={
							isHidden2
								? "hidden absolute top-0 blur-3xl z-0 select-none"
								: "absolute top-0 blur-3xl z-0 select-none"
						}
					/>
					<img
						src={pokemonShinyImage}
						alt={pokemonCard.name}
						className={
							isHidden2 ? "hidden z-10 select-none" : "z-10 select-none"
						}
					/>
				</div>
				<div className="col-span-3 pt-4">
					<div className="flex justify-between mb-4 dark:text-gray-100">
						<h1 className="text-5xl font-bold capitalize">
							{pokemonCard.name}
						</h1>
						<p className="dark:text-gray-700 font-extrabold text-6xl">
							#
							{pokemonCard.id < 10
								? "00" + pokemonCard.id
								: pokemonCard.id < 100
								? "0" + pokemonCard.id
								: pokemonCard.id}
						</p>
					</div>
					<div className="flex flex-col dark:text-gray-100">
						<p className="font-semibold text-xl mb-2">Description</p>
						<p className="font-regular text-lg max-w-lg">{description}</p>
					</div>
					<div className="grid grid-cols-3 my-8">
						<div className="flex items-stretch">
							<div className="dark:bg-gray-800 rounded-full inline-flex items-center p-5 me-4">
								<FaWeightHanging className="dark:text-gray-100 text-2xl" />
							</div>
							<div className="flex flex-col justify-between">
								<p className="text-md font-medium dark:text-gray-500">Weight</p>
								<p className="text-2xl font-semibold dark:text-white">
									{pokemonCard.weight / 10} KG
								</p>
							</div>
						</div>
						<div className="flex items-stretch">
							<div className="dark:bg-gray-800 rounded-full inline-flex items-center p-5 me-4">
								<FaRulerVertical className="dark:text-gray-100 text-2xl" />
							</div>
							<div className="flex flex-col justify-between">
								<p className="text-md font-medium dark:text-gray-500">Height</p>
								<p className="text-2xl font-semibold dark:text-gray-100">
									{pokemonCard.height / 10} M
								</p>
							</div>
						</div>
						<div className="flex items-stretch">
							<div className="dark:bg-gray-800 rounded-full inline-flex items-center p-5 me-4">
								<BiCategory className="dark:text-gray-100 text-2xl" />
							</div>
							<div className="flex flex-col justify-between">
								<p className="text-md font-medium dark:text-gray-500">
									Category
								</p>
								<p className="text-2xl font-semibold dark:text-gray-100">
									{category.replace(/Pokémon/gi, "")}
								</p>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-3 gap-y-8 mt-10">
						<div className="flex flex-col">
							<p className="text-sm font-medium dark:text-gray-500 mb-2">
								Ability
							</p>
							<p className="text-md font-medium dark:text-white capitalize">
								{abilities}
							</p>
						</div>
						<div className="flex flex-col">
							<p className="text-sm font-medium dark:text-gray-500 mb-2">
								Hidden Ability
							</p>
							<p className="text-md font-medium dark:text-white capitalize">
								{hiddenAbility ? hiddenAbility.ability.name : "None"}
							</p>
						</div>
						<div className="flex flex-col">
							<p className="text-sm font-medium dark:text-gray-500 mb-2">
								Type
							</p>
							<p className="text-md font-medium dark:text-white capitalize">
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
							</p>
						</div>
						<div className="flex flex-col">
							<p className="text-sm font-medium dark:text-gray-500 mb-2">
								Hatch Time
							</p>
							<p className="text-md font-medium dark:text-white capitalize">
								{pokemonSpecies
									? pokemonSpecies.hatch_counter * 255 + " Steps"
									: "None"}
							</p>
						</div>
						<div className="flex flex-col">
							<p className="text-sm font-medium dark:text-gray-500 mb-2">
								Growth Rate
							</p>
							{/* - Erratic: 600,000 exp at level 100
                				- Fast: 800,000 exp at level 100
               					- medium fast: 1,000,000 exp at level 100
                  				- medium slow: 1,059,860 exp at level 100
                  				- slow: 1,250,000 exp at level 100
                  				- Fluctuating: 1,640,000 exp at level 100 */}
							<p className="text-md font-medium dark:text-white">
								{growthRate}
							</p>
						</div>
						<div className="flex flex-col">
							<p className="text-sm font-medium dark:text-gray-500 mb-2">
								Weaknesses
							</p>
							<p className="text-md font-medium dark:text-white">
								<div className="flex flex-wrap items-start gap-y-2">
									{PrintWeaknesses(weakTypes)}
								</div>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full h-full mx-auto lg:grid lg:grid-cols-5 p-4 gap-4 mb-14">
				<div className="relative col-span-2">
					<h2 className="text-2xl font-semibold dark:text-white mb-4">Stats</h2>
					<div className="h-full flex items-center shadow-lg shadow-gray-300 dark:shadow-xl dark:shadow-gray-900 bg-gray-50 dark:bg-gray-800 rounded-xl py-6 px-4">
						{EntireStat(pokemonCard)}
					</div>
				</div>
				<div className="relative col-span-3 rounded-xl">
					<h2 className="text-2xl font-semibold dark:text-white mb-4">
						Evolution Line
					</h2>
					<div className="h-full px-4 pt-4 shadow-lg shadow-gray-300 dark:shadow-xl dark:shadow-gray-900 bg-gray-50 dark:bg-gray-800 rounded-xl grid grid-cols-8">
						{PrintEvolutionChain(evolutionChain)}
					</div>
				</div>
			</div>
		</>
	);
}

export default CardDetail;
