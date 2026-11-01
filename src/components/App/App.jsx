import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import About from "../About/About.jsx";
import Footer from "../Footer/Footer.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";
import PokemonPage from "../PokemonPage/PokemonPage.jsx";
import Register from "../Register/Register.jsx";
import Login from "../Login/Login.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import FavoritesPage from "../FavoritesPage/FavoritesPage.jsx";

import CurrentUserContext from "../../contexts/CurrentUserContext.js";

import {
  register,
  login,
  getCurrentUser,
  getFavorites,
  addFavorite,
  deleteFavorite,
} from "../../utils/MainApi.js";

import {
  getPokemon,
  getPokemonList,
} from "../../utils/pokeApi.js";

import {
  JWT_KEY,
  INITIAL_POKEMON_LIMIT,
} from "../../utils/constants.js";

function App() {
  const [pokemon, setPokemon] = useState(null);

  const [pokemonList, setPokemonList] = useState([]);

  const [favorites, setFavorites] = useState([]);
  const [favoritesError, setFavoritesError] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  const [isListLoading, setIsListLoading] =
    useState(false);

  const [currentUser, setCurrentUser] =
    useState(null);

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const [isAuthLoading, setIsAuthLoading] =
    useState(true);

  const [isRegisterOpen, setIsRegisterOpen] =
    useState(false);

  const [isLoginOpen, setIsLoginOpen] =
    useState(false);

  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] =
    useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setIsListLoading(true);

    getPokemonList(INITIAL_POKEMON_LIMIT)
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
    const token = localStorage.getItem(JWT_KEY);

    if (!token) {
      setIsAuthLoading(false);
      return;
    }

    getCurrentUser(token)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem(JWT_KEY);
        setCurrentUser(null);
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsAuthLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      setFavorites([]);
      return;
    }

    const token = localStorage.getItem(JWT_KEY);

    if (!token) {
      return;
    }

    getFavorites(token)
      .then((data) => {
        setFavorites(data);
        setFavoritesError("");
      })
      .catch((favoritesRequestError) => {
        console.error(
          "Error al cargar favoritos:",
          favoritesRequestError
        );

        setFavoritesError("favorites-error");
      });
  }, [isLoggedIn]);

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
      .catch((searchError) => {
        if (searchError.message === "NOT_FOUND") {
          setError("not-found");
        } else {
          setError("api-error");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddFavorite(pokemonToSave) {
    setFavoritesError("");

    const token = localStorage.getItem(JWT_KEY);

    if (!token) {
      handleOpenLogin();
      return Promise.resolve();
    }

    return addFavorite(pokemonToSave, token)
      .then((savedPokemon) => {
        setFavorites((currentFavorites) => [
          ...currentFavorites,
          savedPokemon,
        ]);
      })
      .catch((favoriteError) => {
        console.error(
          "Error al guardar favorito:",
          favoriteError
        );

        setFavoritesError("favorites-error");
      });
  }

  function handleRemoveFavorite(favoriteId) {
    setFavoritesError("");

    const token = localStorage.getItem(JWT_KEY);

    if (!token) {
      handleOpenLogin();
      return Promise.resolve();
    }

    return deleteFavorite(favoriteId, token)
      .then(() => {
        setFavorites((currentFavorites) =>
          currentFavorites.filter(
            (favorite) =>
              favorite._id !== favoriteId
          )
        );
      })
      .catch((favoriteError) => {
        console.error(
          "Error al eliminar favorito:",
          favoriteError
        );

        setFavoritesError("favorites-error");
      });
  }

  function handleRegister({
    email,
    password,
    name,
  }) {
    return register({
      email,
      password,
      name,
    })
      .then(() => {
        return login({
          email,
          password,
        });
      })
      .then((data) => {
        localStorage.setItem(
          JWT_KEY,
          data.token
        );

        return getCurrentUser(data.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        setIsRegisterOpen(false);
      });
  }

  function handleLogin({
    email,
    password,
  }) {
    return login({
      email,
      password,
    })
      .then((data) => {
        localStorage.setItem(
          JWT_KEY,
          data.token
        );

        return getCurrentUser(data.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        setIsLoginOpen(false);
      });
  }

  function handleLogout() {
    localStorage.removeItem(JWT_KEY);

    setCurrentUser(null);
    setIsLoggedIn(false);
    setFavorites([]);

    navigate("/");
  }

  function handleOpenLogin() {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  }

  function handleOpenRegister() {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  }

  function handleCloseLogin() {
    setIsLoginOpen(false);
  }

  function handleCloseRegister() {
    setIsRegisterOpen(false);
  }

  return (
    <CurrentUserContext.Provider
      value={currentUser}
    >
      <div className="app">
        <Header
          isLoggedIn={isLoggedIn}
          onLoginClick={handleOpenLogin}
          onLogout={handleLogout}
        />

        <Routes>
          <Route
            path="/"
            element={
              <main>
                <Main />

                <SearchForm
                  onSearch={handleSearch}
                  isLoading={isLoading}
                />

                <About />
              </main>
            }
          />

          <Route
            path="/pokemon"
            element={
              <PokemonPage
                pokemon={pokemon}
                pokemonList={pokemonList}
                favorites={favorites}
                favoritesError={
                  favoritesError
                }
                isLoading={isLoading}
                isListLoading={
                  isListLoading
                }
                error={error}
                onSearch={handleSearch}
                onAddFavorite={
                  handleAddFavorite
                }
                onRemoveFavorite={
                  handleRemoveFavorite
                }
                searchTerm={searchTerm}
              />
            }
          />

          <Route
            path="/favorites"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                isAuthLoading={
                  isAuthLoading
                }
                onUnauthorized={
                  handleOpenLogin
                }
              >
                <FavoritesPage
                  favorites={favorites}
                  onRemoveFavorite={
                    handleRemoveFavorite
                  }
                />
              </ProtectedRoute>
            }
          />
        </Routes>

        {isRegisterOpen && (
          <Register
            onRegister={handleRegister}
            onSwitchToLogin={
              handleOpenLogin
            }
            onClose={
              handleCloseRegister
            }
          />
        )}

        {isLoginOpen && (
          <Login
            onLogin={handleLogin}
            onSwitchToRegister={
              handleOpenRegister
            }
            onClose={handleCloseLogin}
          />
        )}

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;