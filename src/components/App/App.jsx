import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import About from "../About/About.jsx";
import Footer from "../Footer/Footer.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";
import PokemonPage from "../PokemonPage/PokemonPage.jsx";

import {
  getPokemon,
  getPokemonList,
} from "../../utils/pokeApi.js";

import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState(null);

  const [pokemonList, setPokemonList] = useState(() => {
    const savedPokemon = localStorage.getItem("pokemonList");

    return savedPokemon ? JSON.parse(savedPokemon) : [];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isListLoading, setIsListLoading] = useState(false);  

  const navigate = useNavigate();

  useEffect(() => {
  if (pokemonList.length > 0) {
    return;
  }

  setIsListLoading(true);

  getPokemonList(9)
    .then((data) => {
      setPokemonList(data);
    })
    .catch(() => {
      setError("api-error");
    })
    .finally(() => {
      setIsListLoading(false);
    });
}, []);

  useEffect(() => {
    if (pokemonList.length > 0) {
      localStorage.setItem(
        "pokemonList",
        JSON.stringify(pokemonList)
      );
    }
  }, [pokemonList]);

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
            pokemonList={pokemonList}
            isLoading={isLoading}
            isListLoading={isListLoading}
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