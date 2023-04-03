import React, { useState, useEffect } from "react";
import { TbPokeball } from "react-icons/tb";
import TCGCard from "./Card";
import { TextInput } from "flowbite-react";

const CardList = () => {
	const [tcgList, setTCGList] = useState(null);

	// Nos conectamos a la api para recoger los datos en JSON
	useEffect(() => {
		fetch("https://api.pokemontcg.io/v2/cards?pageSize=20", {
			headers: {
				"X-Api-Key": process.env.TCG_API,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.data !== null) {
					setTCGList(null);
					setTCGList(data.data);
				} else {
					setTCGList(null);
				}
			});
	}, []);

	function searchByName(search) {
		if (search) {
			fetch(
				`https://api.pokemontcg.io/v2/cards?pageSize=20&q=name:${search}*`,
				{
					headers: {
						"X-Api-Key": process.env.TCG_API,
					},
				}
			)
				.then((response) => response.json())
				.then((data) => {
					if (data.data !== null) {
						setTCGList(null);
						setTCGList(data.data);
					} else {
						setTCGList(null);
					}
				}, []);
		}
	}

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			searchByName(event.target.value);
		}
	};

	if (!tcgList) {
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

	const listLenght = tcgList.length;

	return (
		<div className="dark:bg-slate-700 dark:white-text">
			<div className="p-4 dark:bg-slate-700 dark:white-text">
				<h1 className="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-900 lg:mb-6 md:text-5xl xl:text-6xl dark:text-white text-center">
					Trading Card Game
				</h1>
				<p className="dark:text-white text-center text-gray-900">
					Find out the latest stats about your favorite cards.
				</p>
				<div className="mt-4">
					<TextInput
						id="searchTCGCard"
						type="text"
						icon={TbPokeball}
						placeholder="Search by card name"
						required={false}
						sizing="lg"
						onKeyDown={handleKeyDown}
					/>
				</div>
			</div>
			{listLenght === 0 ? (
				<section className="h-full left-0 right-0 pt-52 pb-52 top-0 bg-white dark:bg-gray-900">
					<div className="py-8 px-4 flex flex-col items-center text-center lg:py-16 lg:px-12">
						<TbPokeball className="text-6xl text-gray-400" />
						<h1 className="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-900 lg:mb-6 md:text-5xl xl:text-6xl dark:text-white">
							No data found
						</h1>
						<p class="font-light text-gray-500 md:text-lg xl:text-xl dark:text-gray-400">
							Search for another Card and try again :)
						</p>
					</div>
				</section>
			) : (
				<div className="p-4 grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-5 dark:bg-slate-700">
					{tcgList.map((tcg, key) => (
						<TCGCard id={key} tcgCardID={tcg.id} />
					))}
				</div>
			)}
		</div>
	);
};

export default CardList;
