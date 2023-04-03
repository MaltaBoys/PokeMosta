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
    <div className="dark:white-text p-4">
      <section class="mb-4 rounded-xl shadow-xl bg-center bg-cover bg-no-repeat bg-[url('https://p2.trrsf.com/image/fget/cf/1200/630/middle/images.terra.com/2022/02/21/charizard-tcg-2102.jfif')] bg-gray-700 bg-blend-multiply">
        <div class="mx-full text-center py-20">
          <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            Trading Card Game
          </h1>
          <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            Here at Flowbite we focus on markets where technology, innovation,
            and capital can unlock long-term value and drive economic growth.
          </p>
        </div>
      </section>

      <section class="bg-gray-50 dark:bg-gray-900 flex items-center mb-4">
        <div class="w-full">
          <div class="relative bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
            <div class="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
              <div class="w-full md:w-1/2">
                <form class="flex items-center">
                  <label for="simple-search" class="sr-only">
                    Search
                  </label>
                  <div class="relative w-full">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        class="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewbox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Search"
                      required=""
                    />
                  </div>
                </form>
              </div>
              <div class="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                <div class="flex items-center w-full space-x-3 md:w-auto">
                  <button
                    id="actionsDropdownButton"
                    data-dropdown-toggle="actionsDropdown"
                    class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    type="button"
                  >
                    <svg
                      class="-ml-1 mr-1.5 w-5 h-5"
                      fill="currentColor"
                      viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      />
                    </svg>
                    Actions
                  </button>
                  <div
                    id="actionsDropdown"
                    class="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                  >
                    <ul
                      class="py-1 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="actionsDropdownButton"
                    >
                      <li>
                        <a
                          href="/"
                          class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Mass Edit
                        </a>
                      </li>
                    </ul>
                    <div class="py-1">
                      <a
                        href="/"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Delete all
                      </a>
                    </div>
                  </div>
                  <button
                    id="filterDropdownButton"
                    data-dropdown-toggle="filterDropdown"
                    class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      class="w-4 h-4 mr-2 text-gray-400"
                      viewbox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Filter
                    <svg
                      class="-mr-1 ml-1.5 w-5 h-5"
                      fill="currentColor"
                      viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      />
                    </svg>
                  </button>
                  <div
                    id="filterDropdown"
                    class="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
                  >
                    <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                      Category
                    </h6>
                    <ul
                      class="space-y-2 text-sm"
                      aria-labelledby="dropdownDefault"
                    >
                      <li class="flex items-center">
                        <input
                          id="apple"
                          type="checkbox"
                          value=""
                          class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          for="apple"
                          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          Apple (56)
                        </label>
                      </li>
                      <li class="flex items-center">
                        <input
                          id="fitbit"
                          type="checkbox"
                          value=""
                          class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          for="fitbit"
                          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          Fitbit (56)
                        </label>
                      </li>
                      <li class="flex items-center">
                        <input
                          id="dell"
                          type="checkbox"
                          value=""
                          class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          for="dell"
                          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          Dell (56)
                        </label>
                      </li>
                      <li class="flex items-center">
                        <input
                          id="asus"
                          type="checkbox"
                          value=""
                          checked
                          class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          for="asus"
                          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          Asus (97)
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*
	  <div className="p-4 dark:white-text">
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
	  */}
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
        <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-5 ">
          {tcgList.map((tcg, key) => (
            <TCGCard id={key} tcgCardID={tcg.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardList;
