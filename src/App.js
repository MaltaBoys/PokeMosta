import { Flowbite } from "flowbite-react";
import { Menus, Home, Tcg, Pokedex, ScrollTop } from "./hooks";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CardDetail from "./components/Cards/PokemonCard/CardDetail";

function App() {
  return (
    <Flowbite>
      <header>
        <Menus />
      </header>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/tcg" element={<Tcg />} />
            <Route path="/pokemon/:id" element={<CardDetail />} />
          </Routes>
        </Router>
      </main>
      <ScrollTop />
    </Flowbite>
  );
}

export default App;
