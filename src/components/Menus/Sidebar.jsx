import React from "react";
import { useLocation } from "react-router-dom";
import LogoPM from "../../assets/logotype.png";
import { MdCatchingPokemon } from "react-icons/md";
import { HiHome } from "react-icons/hi";
import { TbCards } from "react-icons/tb";
import Toggle from "../../Themes/theme";

export default function Example() {
  const location = useLocation();

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
              <div className="flex items-center">
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
                  <a
                    href="/login"
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Sign In
                  </a>
                  <a
                    href="/register"
                    type="button"
                    class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Aside Menu */}
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-aauto h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-4 font-medium text-gray-700 dark:text-gray-400">
            <li>
              <a
                href="/"
                className={
                  location.pathname === "/"
                    ? "flex flex-col items-center p-4 rounded-lg bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                    : "flex flex-col items-center p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white"
                }
              >
                {/* <HiHome className="text-3xl" /> */}
                {location.pathname === "/" ? (
                  <svg
                    data-name="Pokeball"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 480 480"
                    className="w-8 mb-2 shadow-md rounded-full"
                  >
                    <circle cx="240" cy="240" r="240" fill="#3c3c3b" />
                    <path
                      d="M179.28,225a75,75,0,0,1,141.44,0h168C476.2,104.2,374.11,10,250,10S23.8,104.2,11.29,225Z"
                      transform="translate(-10 -10)"
                      fill="#e30613"
                    />
                    <path
                      d="M320.72,275a75,75,0,0,1-141.44,0h-168C23.8,395.8,125.89,490,250,490s226.2-94.2,238.71-215Z"
                      transform="translate(-10 -10)"
                      fill="#fff"
                    />
                    <circle cx="240" cy="240" r="45" fill="#fff" />
                  </svg>
                ) : (
                  <svg
                    data-name="Pokeball"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 477.43 480"
                    className="w-8 mb-2 shadow-md opacity-40 invert dark:invert-0 rounded-full"
                  >
                    <path
                      d="M179.28,225a75,75,0,0,1,141.44,0h168C476.2,104.2,374.1,10,250,10S23.8,104.2,11.29,225Z"
                      transform="translate(-11.28 -10)"
                      fill="#fff"
                    />
                    <path
                      d="M320.72,275a75,75,0,0,1-141.44,0h-168C23.8,395.8,125.89,490,250,490s226.21-94.2,238.72-215Z"
                      transform="translate(-11.28 -10)"
                      fill="#fff"
                    />
                    <circle cx="238.72" cy="240" r="45" fill="#fff" />
                  </svg>
                )}
                <span className="text-md">Home</span>
              </a>
            </li>
            <li>
              <a
                href="/pokedex"
                className={
                  location.pathname === "/pokedex"
                    ? "flex flex-col items-center p-4 rounded-lg bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                    : "flex flex-col items-center p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white"
                }
              >
                {/* <MdCatchingPokemon className="text-3xl" /> */}
                {location.pathname === "/pokedex" ? (
                  <svg
                    data-name="Pokedex"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 480 436.33"
                    className="w-8 mb-2"
                  >
                    <g id="Pokedex">
                      <g id="Color">
                        <path
                          d="M392.18,229a395.31,395.31,0,0,0,39-44.47c48.3-63.73,71.47-130,51.75-148.12s-74.86,18.93-123.16,82.65a416.74,416.74,0,0,0-30.05,45.42c-29-24.18-56.63-39.42-77.79-42-20.61-4.34-51.73,9.62-85.17,36.1a422.4,422.4,0,0,0-26.61-39.49C91.89,55.35,36.75,18.34,17,36.42s3.45,84.39,51.75,148.12A405.52,405.52,0,0,0,102,223.19q-9.66,11.73-18.92,24.43C21.7,331.82.68,413.22,36.1,429.42c.32.15.64.27,1,.41,31.33,22.38,112.83,38.33,208.44,38.33,96.37,0,178.4-16.21,209.17-38.87,34-17.32,12.76-97.93-48-181.3Q399.58,238.22,392.18,229Z"
                          transform="translate(-10 -31.84)"
                          fill="#fff"
                        />
                        <path
                          d="M16.86,36.3c-19.23,17.63,3.36,82.28,50.45,144.41,7.09,9.36,14.33,18.11,21.58,26.19l76.36,22.49q-4.56-42.48-9.13-85c-5.83-9.13-12.24-18.36-19.19-27.54C89.84,54.76,36.08,18.68,16.86,36.3Z"
                          transform="translate(-10 -31.84)"
                          fill="#e30613"
                        />
                      </g>
                    </g>
                  </svg>
                ) : (
                  <svg
                    data-name="Pokedex Inactive"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 480 436.33"
                    className="w-8 mb-2 opacity-40 invert dark:invert-0"
                  >
                    <g id="Pokedex">
                      <path
                        id="White"
                        d="M392.18,229a395.31,395.31,0,0,0,39-44.47c48.3-63.73,71.47-130,51.75-148.12s-74.86,18.93-123.16,82.65a416.74,416.74,0,0,0-30.05,45.42c-29-24.18-56.63-39.42-77.79-42-20.61-4.34-51.73,9.62-85.17,36.1a422.4,422.4,0,0,0-26.61-39.49C91.89,55.35,36.75,18.34,17,36.42s3.45,84.39,51.75,148.12A405.52,405.52,0,0,0,102,223.19q-9.66,11.73-18.92,24.43C21.7,331.82.68,413.22,36.1,429.42c.32.15.64.27,1,.41,31.33,22.38,112.83,38.33,208.44,38.33,96.37,0,178.4-16.21,209.17-38.87,34-17.32,12.76-97.93-48-181.3Q399.58,238.22,392.18,229Z"
                        transform="translate(-10 -31.84)"
                        fill="#fff"
                      />
                    </g>
                  </svg>
                )}
                <span className="text-md">Pokedex</span>
              </a>
            </li>
            <li>
              <a
                href="/tcg"
                className={
                  location.pathname === "/tcg"
                    ? "flex flex-col items-center p-4 rounded-lg bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                    : "flex flex-col items-center p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white"
                }
              >
                {/* <TbCards className="text-3xl" /> */}
                {location.pathname === "/tcg" ? (
                  <svg
                    data-name="TCG"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 438 450"
                    className="w-8 mb-2"
                  >
                    <path
                      d="M31.31,80.72,100,467.14V48.68L47.44,57.87A19.74,19.74,0,0,0,31.31,80.72Z"
                      transform="translate(-31 -25)"
                      fill="#fff"
                    />
                    <path
                      d="M452.56,57.87,400,48.68V467.14L468.69,80.72A19.74,19.74,0,0,0,452.56,57.87Z"
                      transform="translate(-31 -25)"
                      fill="#fff"
                    />
                    <path
                      d="M250,275a25,25,0,0,1-24.27-19H186.29a64,64,0,0,0,127.42,0H274.27A25,25,0,0,1,250,275Z"
                      transform="translate(-31 -25)"
                      fill="#e30613"
                    />
                    <path
                      d="M265,250a15,15,0,1,0-15,15A15,15,0,0,0,265,250Zm-21.5,0a6.5,6.5,0,1,1,6.5,6.5A6.5,6.5,0,0,1,243.5,250Z"
                      transform="translate(-31 -25)"
                      fill="#e30613"
                    />
                    <path
                      d="M250,186a64,64,0,0,0-63.71,58h39.44a25,25,0,0,1,48.54,0h39.44A64,64,0,0,0,250,186Z"
                      transform="translate(-31 -25)"
                      fill="#e30613"
                    />
                    <path
                      d="M375,25H125a10,10,0,0,0-10,10V465a10,10,0,0,0,10,10H375a10,10,0,0,0,10-10V35A10,10,0,0,0,375,25ZM250,325a75,75,0,1,1,75-75A75,75,0,0,1,250,325Z"
                      transform="translate(-31 -25)"
                      fill="#e30613"
                    />
                  </svg>
                ) : (
                  <svg
                    data-name="TCG Inactive"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 438 450"
                    className="w-8 mb-2 opacity-40 invert dark:invert-0"
                  >
                    <path
                      d="M31.31,80.72,100,467.14V48.68L47.44,57.87A19.74,19.74,0,0,0,31.31,80.72Z"
                      transform="translate(-31 -25)"
                      fill="#fff"
                    />
                    <path
                      d="M452.56,57.87,400,48.68V467.14L468.69,80.72A19.74,19.74,0,0,0,452.56,57.87Z"
                      transform="translate(-31 -25)"
                      fill="#fff"
                    />
                    <path
                      d="M250,275a25,25,0,0,1-24.27-19H186.29a64,64,0,0,0,127.42,0H274.27A25,25,0,0,1,250,275Z"
                      transform="translate(-31 -25)"
                      fill="#fff"
                    />
                    <path
                      d="M265,250a15,15,0,1,0-15,15A15,15,0,0,0,265,250Zm-21.5,0a6.5,6.5,0,1,1,6.5,6.5A6.5,6.5,0,0,1,243.5,250Z"
                      transform="translate(-31 -25)"
                      fill="#fff"
                    />
                    <path
                      d="M250,186a64,64,0,0,0-63.71,58h39.44a25,25,0,0,1,48.54,0h39.44A64,64,0,0,0,250,186Z"
                      transform="translate(-31 -25)"
                      fill="#fff"
                    />
                    <path
                      d="M375,25H125a10,10,0,0,0-10,10V465a10,10,0,0,0,10,10H375a10,10,0,0,0,10-10V35A10,10,0,0,0,375,25ZM250,325a75,75,0,1,1,75-75A75,75,0,0,1,250,325Z"
                      transform="translate(-31 -25)"
                      fill="#fff"
                    />
                  </svg>
                )}
                <span className="text-md">TCG</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Bottom menu */}
      <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-600 transition-transform translate-y-0 sm:translate-y-full">
        <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
          <a
            href="/"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <HiHome className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Home
            </span>
          </a>
          <a
            href="/pokedex"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <MdCatchingPokemon className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Pokedex
            </span>
          </a>
          <a
            href="/tcg"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <TbCards className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              TCG
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
