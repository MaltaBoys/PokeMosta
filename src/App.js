import { Flowbite } from "flowbite-react";
import { Menus, Home, Tcg, Pokedex, ScrollTop, Register } from "./hooks";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CardDetail from "./components/Cards/PokemonCard/CardDetail";

function App() {
  return (
    <Flowbite>
      <Router>
        <header>
          <Menus />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/tcg" element={<Tcg />} />
            <Route path="/pokemon/:id" element={<CardDetail />} />
          </Routes>
        </main>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
        <ScrollTop />
      </Router>
    </Flowbite>
  );
}

export default App;
