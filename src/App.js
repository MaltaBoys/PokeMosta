import { Flowbite } from "flowbite-react";
import { Menus, Home, Tcg, Pokedex, Pokemon } from "./hooks";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Flowbite>
      <header>
        <Menus />
      </header>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/tcg" element={<Tcg />} />
            <Route path="/pokemon" elemen={<Pokemon />} />
          </Routes>
        </BrowserRouter>
      </main>
    </Flowbite>
  );
}

export default App;
