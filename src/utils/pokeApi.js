import {
  POKE_API_BASE_URL,
  INITIAL_POKEMON_LIMIT,
} from "./constants.js";

export function getPokemon(name) {
  return fetch(
    `${POKE_API_BASE_URL}/pokemon/${name.toLowerCase()}`
  ).then((response) => {
    if (response.status === 404) {
      throw new Error("NOT_FOUND");
    }

    if (!response.ok) {
      throw new Error("API_ERROR");
    }

    return response.json();
  });
}

export function getPokemonList(limit = INITIAL_POKEMON_LIMIT) {
  return fetch(
    `${POKE_API_BASE_URL}/pokemon?limit=${limit}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("API_ERROR");
      }

      return response.json();
    })
    .then((data) => {
      return Promise.all(
        data.results.map((pokemon) =>
          fetch(pokemon.url).then((response) => {
            if (!response.ok) {
              throw new Error("API_ERROR");
            }

            return response.json();
          })
        )
      );
    });
}