import React from "react";
import { Sidebar } from "flowbite-react";
import { BiHomeAlt } from "react-icons/bi";
import { TbPokeball, TbCards, TbCategory2 } from "react-icons/tb";
import { BsCalendar2 } from "react-icons/bs";

export default function Example() {
  return (
    <Sidebar className="w-fit sidebar">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            href="/"
            icon={BiHomeAlt}
            className="flex flex-col w-28 mb-4 text-sm font-semibold"
          >
            Inicio
          </Sidebar.Item>
          <Sidebar.Item
            href="/pokedex"
            icon={TbPokeball}
            className="flex flex-col w-28 mb-4 text-sm font-semibold"
          >
            Pokedex
          </Sidebar.Item>
          <Sidebar.Item
            href="/tcg"
            icon={TbCards}
            className="flex flex-col w-28 mb-4 text-sm font-semibold"
          >
            TCG
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={BsCalendar2}
            className="flex flex-col w-28 mb-4 text-sm font-semibold"
          >
            Eventos
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={TbCategory2}
            className="flex flex-col w-28 mb-4 text-sm font-semibold"
          >
            Series
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
