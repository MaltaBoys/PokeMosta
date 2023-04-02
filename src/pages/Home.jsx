import React from "react";
import { FiGithub } from "react-icons/fi";
import ReactLogo from "../assets/ReactLogo.png";
import VercelLogo from "../assets/VercelLogo.png";
import MongoDBLogo from "../assets/MongoDBLogo.png";

const Home = () => {
  return (
    <section class="dark:bg-gray-900">
      <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <a
          href="/"
          class="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          role="alert"
        >
          <span class="text-xs bg-primary-600 rounded-full text-white px-4 py-1.5 mr-3">
            New
          </span>{" "}
          <span class="text-sm font-medium">
            Flowbite is out! See what's new
          </span>
          <svg
            class="ml-2 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </a>
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          We invest in the world’s potential
        </h1>
        <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Here at Flowbite we focus on markets where technology, innovation, and
          capital can unlock long-term value and drive economic growth.
        </p>
        <div class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <a
            href="https://github.com/MaltaBoys/PokeMosta"
            class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            <FiGithub className="mr-2" />
            Ver código
          </a>
        </div>
        <div class="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
          <span class="font-semibold text-gray-400 uppercase">FEATURED IN</span>
          <div class="flex justify-center items-center mt-8 sm:justify-between">
            <a
              href="https://vercel.com/"
              class="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400"
            >
              <img
                src={VercelLogo}
                alt="Vercel Logo"
                className="w-100 invert"
              />
            </a>
            <a
              href="https://react.dev/"
              className="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400"
            >
              <img src={ReactLogo} alt="React Logo" className="w-100" />
            </a>
            <a
              href="https://www.mongodb.com/"
              class="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400"
            >
              <img src={MongoDBLogo} alt="MongoDB Logo" className="w-140" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
