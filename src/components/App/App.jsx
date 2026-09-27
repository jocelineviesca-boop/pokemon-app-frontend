import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import About from "../About/About.jsx";
import Footer from "../Footer/Footer.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";
import PokemonPage from "../PokemonPage/PokemonPage.jsx";

import { getPokemon } from "../../utils/pokeApi.js";

import "./App.css";

  function App() {
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  function handleSearch(query) {
  setSearchTerm(query);
  setIsLoading(true);
  setPokemon(null);
  setError("");

  navigate("/pokemon");

  getPokemon(query)
    .then((data) => {
      setPokemon(data);
    })
    .catch((error) => {
      if (error.message === "NOT_FOUND") {
        setError("not-found");
      } else {
        setError("api-error");
      }
    })
    .finally(() => {
      setIsLoading(false);
    });
}

    return (
    <div className="app">
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Main />

              <SearchForm
                onSearch={handleSearch}
                isLoading={isLoading}
              />

              <About />
            </>
          }
        />

        <Route
  path="/pokemon"
  element={
    <PokemonPage
  pokemon={pokemon}
  isLoading={isLoading}
  error={error}
  onSearch={handleSearch}
  searchTerm={searchTerm}
/>
  }
/>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;