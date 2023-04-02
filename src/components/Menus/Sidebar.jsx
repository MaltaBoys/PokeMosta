import React from "react";
import { Button } from "flowbite-react";
import LogoPM from "../../assets/logotype.png";
import { MdCatchingPokemon } from "react-icons/md";
import { HiHome } from "react-icons/hi";
import { TbCards } from "react-icons/tb";
import { GiPokecog } from "react-icons/gi";
import Toggle from "../Themes/theme";
export default function Example() {
	return (
		<>
			{/* Navbar Menu */}
			<nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
				<div className="px-3 py-3 lg:px-5 lg:pl-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center justify-start">
							{/* Logotype */}
							<a href="/" className="flex ml-2 md:mr-24">
								<img
									src={LogoPM}
									className="h-8 mr-3"
									alt="PokeMosta Logo"
									title="PokeMosta"
								/>
							</a>
						</div>
						<div className="flex items-center">
							<div className="flex items-center ml-3">
								{/* User Section */}
								<div className="flex flex-wrap gap-2">
									<Toggle />
									<div>
										<Button>Sign In</Button>
									</div>
									<div>
										<Button color="light">Sign Up</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>

			{/* Aside Menu */}
			<aside
				id="logo-sidebar"
				className="fixed top-0 left-0 z-40 w-44 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
				aria-label="Sidebar"
			>
				<div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
					<ul className="space-y-4 font-medium">
						<li>
							<a
								href="/"
								className="flex flex-col items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<HiHome className="text-4xl" />
								<span className="text-lg">Home</span>
							</a>
						</li>
						<li>
							<a
								href="pokedex"
								className="flex flex-col items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<MdCatchingPokemon className="text-4xl" />
								<span className="text-lg">Pokedex</span>
							</a>
						</li>
						<li>
							<a
								href="/tcg"
								className="flex flex-col items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<TbCards className="text-4xl" />
								<span className="text-lg">TCG</span>
							</a>
						</li>
						<li>
							<a
								href="/generations"
								className="flex flex-col items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<GiPokecog className="text-4xl" />
								<span className="text-lg">Generations</span>
							</a>
						</li>
					</ul>
				</div>
			</aside>
		</>
	);
}
