import { Navbar, Sidebar, Home, Tcg, Pokedex, Pokemon } from "./hooks";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="content">
        <aside>
          <Sidebar />
        </aside>
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
      </div>
    </>
  );
}

export default App;
