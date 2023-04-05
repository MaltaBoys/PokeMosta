import React from "react";
import { FiGithub } from "react-icons/fi";
import ReactLogo from "../assets/ReactLogo.png";
import NetlifyLogo from "../assets/NetlifyLogo.png";
import MongoDBLogo from "../assets/MongoDBLogo.png";

const Home = () => {
  return (
    <section class="dark:bg-gray-900">
      <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <div class="inline-flex justify-between items-center py-2 px-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white">
          <span class="text-sm font-medium">Developed by students</span>
        </div>
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          PokeMosta
        </h1>
        <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Web page about Pokemons, where you can see the complete pokedex, see
          details of each pokemon, its evolutions, trading card game and much
          more.
        </p>
        <div class=" flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <a
            href="https://github.com/MaltaBoys/PokeMosta"
            class="transition inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:ring-blue-100 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          >
            Start now
          </a>
          <a
            href="/register"
            class="transition inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            <FiGithub className="mr-2" />
            Star on GitHub
          </a>
        </div>
        <div class="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
          <span class="font-semibold text-gray-400 uppercase">
            Developed in
          </span>
          <div class="grid grid-cols-3 gap-8 mt-8">
            <a
              href="https://netlify.com/"
              class="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400"
            >
              <img
                src={NetlifyLogo}
                alt="Netlify Logo"
                className="transition grayscale opacity-50 hover:grayscale-0 hover:opacity-100"
              />
            </a>
            <a
              href="https://react.dev/"
              className="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400"
            >
              <img
                src={ReactLogo}
                alt="React Logo"
                className="transition grayscale opacity-50 hover:grayscale-0 hover:opacity-100"
              />
            </a>
            <a
              href="https://www.mongodb.com/"
              class="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400"
            >
              <img
                src={MongoDBLogo}
                alt="MongoDB Logo"
                className="transition grayscale opacity-50 hover:grayscale-0 hover:opacity-100"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
