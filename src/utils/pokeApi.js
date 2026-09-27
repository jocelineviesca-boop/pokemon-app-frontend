const BASE_URL = "https://pokeapi.co/api/v2";

export function getPokemon(name) {
  return fetch(`${BASE_URL}/pokemon/${name.toLowerCase()}`)
    .then((response) => {
      if (response.status === 404) {
        throw new Error("NOT_FOUND");
      }

      if (!response.ok) {
        throw new Error("API_ERROR");
      }

      return response.json();
    });
}