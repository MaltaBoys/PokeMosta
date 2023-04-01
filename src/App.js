import { Flowbite } from "flowbite-react";
import { Menus, Home, Tcg, Pokedex, Pokemon } from "./hooks";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
            <Route path="/pokemon/:id" element={<Pokemon />} />
          </Routes>
        </Router>
      </main>
    </Flowbite>
  );
}

export default App;
