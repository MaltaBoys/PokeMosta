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
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
      .then((response) => {
        const types = response.data.types.map((type) => type.type.name);
        const promises = types.map((type) =>
          axios.get(`https://pokeapi.co/api/v2/type/${type}`)
        );
        Promise.all(promises)
          .then((responses) => {
            const weaknesses = responses
              .map(
                (response) => response.data.damage_relations.double_damage_from
              )
              .flat()
              .map((weakness) => weakness.name);
            setWeaknesses(weaknesses);
          })
          .catch((error) => console.log(error));
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
    setIsHidden1(!isHidden1);
    setIsHidden2(!isHidden2);
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
    category = pokemonSpecies.genera[7].genus;
  } else {
    category = "Any category";
  }

  // Get growth rate
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

  function PrintWeaknesses(weakTypes) {
    const weaknessesDiv = [];
    weakTypes.forEach((element) => {
      weaknessesDiv.push(
        <div
          className={`leading-none me-2 text-xs font-medium mr-2 px-3 pt-2.5 pb-2 rounded-md ${typesStyleSheet[element]}`}
        >
          {element}
        </div>
      );
    });
    return <>{weaknessesDiv}</>;
  }

  function PrintEvolutionChain(evolutionChain) {
    const chain = [];
    function getEvoImage(imgsource) {
      const url = imgsource.species.url;
      const regex = /(\d+)\/$/;
      const numberId = url.match(regex)[1];
      const stringImgPoke = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${numberId}.png`;
      return <img src={stringImgPoke} alt="PokemonChainImage" />;
    }
    function PrintEvolutionChain(evolutionChain) {
      const chain = [];

      if (evolutionChain.species) {
        chain.push(
          <div>
            <p>First Evolution:</p>
            <p>Name: {evolutionChain.species.name}</p>
            <p>URL: {evolutionChain.species.url}</p>
          </div>
        );
      }
      if (evolutionChain.species) {
        chain.push(
          <div>
            <p>First Evolution:</p>
            <p>Name: {evolutionChain.species.name}</p>
            <p>URL: {evolutionChain.species.url}</p>
            {getEvoImage(evolutionChain)}
          </div>
        );
      }

      if (evolutionChain.evolves_to) {
        evolutionChain.evolves_to.forEach((evolution) => {
          const details = evolution.evolution_details.map((detail) => {
            if (detail.min_level) {
              return `Minimum Level: ${detail.min_level}`;
            } else if (detail.item) {
              return `Item: ${detail.item.name}`;
            } else if (detail.held_item) {
              return `Held Item: ${detail.held_item.name}`;
            } else if (detail.min_happiness) {
              return `Minimum Happiness: ${detail.min_happiness}`;
            } else if (detail.location) {
              return `Location: ${detail.location.name}`;
            } else if (detail.known_move) {
              return `Known Move: ${detail.known_move.name}`;
            } else if (detail.trigger) {
              return `Trigger: ${detail.trigger.name}`;
            } else {
              return "Unknown Evolution Detail";
            }
          });

          chain.push(
            <div key={evolution.species.name}>
              <p>Second Evolution:</p>
              <p>Name: {evolution.species.name}</p>
              <p>URL: {evolution.species.url}</p>
              <p>{details}</p>
            </div>
          );
          if (evolutionChain.evolves_to) {
            evolutionChain.evolves_to.forEach((evolution) => {
              let itemEvo = false;
              let itemImg = "";
              let itemTrade = false;
              let itemTradeImg = "";
              const details = evolution.evolution_details.map((detail) => {
                if (detail.min_level) {
                  return `Minimum Level: ${detail.min_level}`;
                } else if (detail.item) {
                  itemEvo = true;
                  itemImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${detail.item.name}.png`;
                  return `Item: ${detail.item.name}`;
                } else if (detail.held_item) {
                  itemTrade = true;
                  itemTradeImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${detail.held_item.name}.png`;
                  return `Held Item: ${detail.held_item.name}`;
                } else if (detail.min_happiness) {
                  return `Minimum Happiness: ${detail.min_happiness}`;
                } else if (detail.location) {
                  return `Location: ${detail.location.name}`;
                } else if (detail.known_move) {
                  return `Known Move: ${detail.known_move.name}`;
                } else if (detail.trigger) {
                  return `Trigger: ${detail.trigger.name}`;
                } else {
                  return "Unknown Evolution Detail";
                }
              });
              chain.push(
                <div key={evolution.species.name}>
                  <p>Second Evolution:</p>
                  <p>Name: {evolution.species.name}</p>
                  <p>URL: {evolution.species.url}</p>
                  <p>{details}</p>
                  {itemEvo ? <img src={itemImg} alt="Item" /> : ""}
                  {itemTrade ? <img src={itemTradeImg} alt="Item" /> : ""}
                  {getEvoImage(evolution)}
                </div>
              );

              if (evolution.evolves_to) {
                evolution.evolves_to.forEach((evolution) => {
                  const details = evolution.evolution_details.map((detail) => {
                    if (detail.min_level) {
                      return `Minimum Level: ${detail.min_level}`;
                    } else if (detail.item) {
                      return `Item: ${detail.item.name}`;
                    } else if (detail.held_item) {
                      return `Held Item: ${detail.held_item.name}`;
                    } else if (detail.min_happiness) {
                      return `Minimum Happiness: ${detail.min_happiness}`;
                    } else if (detail.location) {
                      return `Location: ${detail.location.name}`;
                    } else if (detail.known_move) {
                      return `Known Move: ${detail.known_move.name}`;
                    } else if (detail.trigger) {
                      return `Trigger: ${detail.trigger.name}`;
                    } else {
                      return "Unknown Evolution Detail";
                    }
                  });
                  if (evolution.evolves_to) {
                    evolution.evolves_to.forEach((evolution) => {
                      let itemEvo = false;
                      let itemImg = "";
                      let itemTrade = false;
                      let itemTradeImg = "";
                      const details = evolution.evolution_details.map(
                        (detail) => {
                          if (detail.min_level) {
                            return `Minimum Level: ${detail.min_level}`;
                          } else if (detail.item) {
                            itemEvo = true;
                            itemImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${detail.item.name}.png`;
                            return `Item: ${detail.item.name}`;
                          } else if (detail.held_item) {
                            itemTrade = true;
                            itemTradeImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${detail.held_item.name}.png`;
                            return `Held Item: ${detail.held_item.name}`;
                          } else if (detail.min_happiness) {
                            return `Minimum Happiness: ${detail.min_happiness}`;
                          } else if (detail.location) {
                            return `Location: ${detail.location.name}`;
                          } else if (detail.known_move) {
                            return `Known Move: ${detail.known_move.name}`;
                          } else if (detail.trigger) {
                            return `Trigger: ${detail.trigger.name}`;
                          } else {
                            return "Unknown Evolution Detail";
                          }
                        }
                      );

                      chain.push(
                        <div key={evolution.species.name}>
                          <p>Third Evolution:</p>
                          <p>Name: {evolution.species.name}</p>
                          <p>URL: {evolution.species.url}</p>
                          <p>{details}</p>
                        </div>
                      );
                    });
                  }
                });
              }
              chain.push(
                <div key={evolution.species.name}>
                  <p>Third Evolution:</p>
                  <p>Name: {evolution.species.name}</p>
                  <p>URL: {evolution.species.url}</p>
                  <p>{details}</p>
                  {itemEvo ? <img src={itemImg} alt="Item" /> : ""}
                  {itemTrade ? <img src={itemTradeImg} alt="Item" /> : ""}
                  {getEvoImage(evolution)}
                </div>
              );
            });
          }
        });
      }

      return chain;
    }
    return <div className="flex flex-col gap-3">{chain}</div>;
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
              <span className="sr-only">Back</span>
            </Link>
            <FaStar
              onClick={toggleDivs}
              className="transition text-4xl dark:text-gray-600 dark:hover:text-yellow-300 cursor-pointer"
            />
          </div>
          <img
            src={pokemonImage}
            alt={pokemonCard.name}
            className={
              isHidden1
                ? "hidden absolute top-0 blur-3xl z-0"
                : "absolute top-0 blur-3xl z-0"
            }
          />
          <img
            src={pokemonImage}
            alt={pokemonCard.name}
            className={isHidden1 ? "hidden z-10" : "z-10"}
          />
          <img
            src={pokemonShinyImage}
            alt={pokemonCard.name}
            className={
              isHidden2
                ? "hidden absolute top-0 blur-3xl z-0"
                : "absolute top-0 blur-3xl z-0"
            }
          />
          <img
            src={pokemonShinyImage}
            alt={pokemonCard.name}
            className={isHidden2 ? "hidden z-10" : "z-10"}
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
                  {pokemonCard.weight} KG
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
                  {pokemonCard.height} CM
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
              <p className="text-md font-medium dark:text-white capitalize">
                {growthRate}
              </p>
              {/* - Erratic: 600,000 exp at level 100
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
							className="transition text-4xl dark:text-gray-600 dark:hover:text-yellow-300 cursor-pointer"
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
									{pokemonCard.weight} KG
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
									{pokemonCard.height} CM
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
							<p className="text-md font-medium dark:text-white capitalize">
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
              <p className="text-sm font-medium dark:text-gray-500 mb-2">
                Weaknesses
              </p>
              <p className="text-md font-medium dark:text-white capitalize">
                <div className="flex">{PrintWeaknesses(weakTypes)}</div>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mx-auto lg:grid lg:grid-cols-5 p-4 gap-4">
        <div className="overflow-hidden relative col-span-2">
          <h2 className="text-2xl font-semibold dark:text-white mb-4">Stats</h2>
          <div className="shadow-lg shadow-gray-300 dark:shadow-xl dark:shadow-gray-900 bg-gray-50 dark:bg-gray-800 rounded-xl py-6 px-4">
            {EntireStat(pokemonCard)}
          </div>
        </div>
        <div className="overflow-hidden relative col-span-3">
          <h2 className="text-2xl font-semibold dark:text-white mb-4">
            Evolution Line
          </h2>
          <div className="shadow-lg shadow-gray-300 dark:shadow-xl dark:shadow-gray-900 bg-gray-50 dark:bg-gray-800 rounded-xl flex justify-center items-center">
            {PrintEvolutionChain(evolutionChain)}
          </div>
        </div>
      </div>
    </>
  );
}

export default CardDetail;
