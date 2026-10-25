const BASE_URL = "https://pokemon-api.happyminecraft.org";

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }

  return response.json().then((data) => {
    const error = new Error(
      data.message || "Ha ocurrido un error"
    );

    error.status = response.status;

    return Promise.reject(error);
  });
}

export function register({
  email,
  password,
  name,
}) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  }).then(checkResponse);
}

export function login({
  email,
  password,
}) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then(checkResponse);
}

export function getCurrentUser(token) {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export function getFavorites(token) {
  return fetch(`${BASE_URL}/favorites`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export function addFavorite(pokemon, token) {
  return fetch(`${BASE_URL}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      pokemonId: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.front_default,
      type: pokemon.types[0].type.name,
    }),
  }).then(checkResponse);
}

export function deleteFavorite(
  favoriteId,
  token
) {
  return fetch(
    `${BASE_URL}/favorites/${favoriteId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then(checkResponse);
}