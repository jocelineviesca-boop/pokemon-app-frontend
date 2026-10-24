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

import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState(null);

  const [pokemonList, setPokemonList] = useState(() => {
    const savedPokemon = localStorage.getItem(
      "pokemonList"
    );

    return savedPokemon
      ? JSON.parse(savedPokemon)
      : [];
  });

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

  const [isRegisterOpen, setIsRegisterOpen] =
    useState(false);

  const [isLoginOpen, setIsLoginOpen] =
    useState(false);

  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] =
    useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (pokemonList.length > 0) {
      return;
    }

    setIsListLoading(true);

    getPokemonList()
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

  useEffect(() => {
  if (!isLoggedIn) {
    setFavorites([]);
    return;
  }

  const token = localStorage.getItem("jwt");

  if (!token) {
    return;
  }

  getFavorites(token)
    .then((data) => {
      setFavorites(data);
      setFavoritesError("");
    })
    .catch((error) => {
      console.error(
        "Error al cargar favoritos:",
        error
      );

      setFavoritesError("favorites-error");
    });
}, [isLoggedIn]);

  useEffect(() => {
  const token = localStorage.getItem("jwt");

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
      localStorage.removeItem("jwt");
      setCurrentUser(null);
      setIsLoggedIn(false);
    })
    .finally(() => {
      setIsAuthLoading(false);
    });
}, []);

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

  function handleAddFavorite(pokemon) {
  setFavoritesError("");

  const token = localStorage.getItem("jwt");

  if (!token) {
    handleOpenLogin();
    return Promise.resolve();
  }

  return addFavorite(pokemon, token)
    .then((savedPokemon) => {
      setFavorites(
        (currentFavorites) => [
          ...currentFavorites,
          savedPokemon,
        ]
      );
    })
    .catch((error) => {
      console.error(
        "Error al guardar favorito:",
        error
      );

      setFavoritesError("favorites-error");
    });
}

 function handleRemoveFavorite(favoriteId) {
  setFavoritesError("");

  const token = localStorage.getItem("jwt");

  if (!token) {
    handleOpenLogin();
    return Promise.resolve();
  }

  return deleteFavorite(favoriteId, token)
    .then(() => {
      setFavorites(
        (currentFavorites) =>
          currentFavorites.filter(
            (favorite) =>
              favorite._id !== favoriteId
          )
      );
    })
    .catch((error) => {
      console.error(
        "Error al eliminar favorito:",
        error
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
        "jwt",
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
          "jwt",
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
    localStorage.removeItem("jwt");

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
        favorites={favorites}
        favoritesError={favoritesError}
        isLoading={isLoading}
        isListLoading={isListLoading}
        error={error}
        onSearch={handleSearch}
        onAddFavorite={handleAddFavorite}
        onRemoveFavorite={handleRemoveFavorite}
        searchTerm={searchTerm}
      />
    }
  />

  <Route
  path="/favorites"
  element={
    <ProtectedRoute
      isLoggedIn={isLoggedIn}
      isAuthLoading={isAuthLoading}
      onUnauthorized={handleOpenLogin}
    >
      <FavoritesPage
        favorites={favorites}
        onRemoveFavorite={handleRemoveFavorite}
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