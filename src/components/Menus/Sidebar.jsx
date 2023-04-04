import React from "react";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import LogoPM from "../../assets/logotype.png";
import { MdCatchingPokemon } from "react-icons/md";
import { HiHome } from "react-icons/hi";
import { TbCards } from "react-icons/tb";
import { GiPokecog } from "react-icons/gi";
import Toggle from "../../Themes/theme";

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
                <div className="flex gap-2">
                  <div className="flex justify-end items-center mr-4 gap-2">
                    <button className="text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 focus:outline-none shadow-lg p-2 text-lg rounded-full outline-none ring-transparent cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </button>
                    <Toggle />
                  </div>
                  <Button>Sign In</Button>
                  <Button color="light">Sign Up</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Aside Menu */}
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-auto h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-4 font-medium text-gray-700 dark:text-gray-400">
            <li>
              <a
                href="/"
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black first-letter:dark:hover:text-white"
              >
                <HiHome className="text-3xl" />
                <span className="text-md">Home</span>
              </a>
            </li>
            <li>
              <a
                href="/pokedex"
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white"
              >
                <MdCatchingPokemon className="text-3xl" />
                <span className="text-md">Pokedex</span>
              </a>
            </li>
            <li>
              <a
                href="/tcg"
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white"
              >
                <TbCards className="text-3xl" />
                <span className="text-md">TCG</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
