import { useState } from "react";

import "./PokemonCardList.css";

import PokemonCard from "../PokemonCard/PokemonCard.jsx";

import {
  INITIAL_VISIBLE_COUNT,
  POKEMON_INCREMENT,
} from "../../utils/constants.js";

function PokemonCardList({ pokemonList }) {
  const [visibleCount, setVisibleCount] = useState(
    INITIAL_VISIBLE_COUNT
  );

  function handleShowMore() {
    setVisibleCount(
      (currentCount) => currentCount + POKEMON_INCREMENT
    );
  }

  const visiblePokemon = pokemonList.slice(
    0,
    visibleCount
  );

  return (
    <section className="pokemon-card-list">
      <h2 className="pokemon-card-list__title">
        Explora Pokémon
      </h2>

      <div className="pokemon-card-list__items">
        {visiblePokemon.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
          />
        ))}
      </div>

      {visibleCount < pokemonList.length && (
        <button
          className="pokemon-card-list__button"
          type="button"
          onClick={handleShowMore}
        >
          Mostrar más
        </button>
      )}
    </section>
  );
}

export default PokemonCardList;