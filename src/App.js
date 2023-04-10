import { Flowbite } from "flowbite-react";
import {
  Menus,
  Home,
  Tcg,
  Pokedex,
  ScrollTop,
  Register,
  Login,
  User,
} from "./hooks";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CardDetail from "./components/Cards/PokemonCard/CardDetail";

function App() {
  return (
    <Flowbite>
      <Router>
        <header>
          <Menus />
        </header>
        <main className="mt-20 ml-0 mb-20 sm:ml-32 sm:mb-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/tcg" element={<Tcg />} />
            <Route path="/pokemon/:id" element={<CardDetail />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </main>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <ScrollTop />
      </Router>
    </Flowbite>
  );
}

export default App;
