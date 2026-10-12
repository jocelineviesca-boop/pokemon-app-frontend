import { FAVORITES_API_URL } from "./constants.js";

export function getFavorites() {
  return fetch(FAVORITES_API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("FAVORITES_GET_ERROR");
      }

      return response.json();
    });
}

export function addFavorite(pokemon) {
  const favoritePokemon = {
    pokemonId: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.front_default,
    type: pokemon.types[0].type.name,
  };

  return fetch(FAVORITES_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(favoritePokemon),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("FAVORITE_POST_ERROR");
    }

    return response.json();
  });
}

export function removeFavorite(id) {
  return fetch(`${FAVORITES_API_URL}/${id}`, {
    method: "DELETE",
  }).then((response) => {
    if (response.status === 404) {
      throw new Error("FAVORITE_NOT_FOUND");
    }

    if (!response.ok) {
      throw new Error("FAVORITE_DELETE_ERROR");
    }

    return response.json();
  });
}