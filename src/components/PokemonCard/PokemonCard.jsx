import "./PokemonCard.css";

import { pokemonTypeColors } from "../../utils/pokemonTypes.js";

function PokemonCard({
  pokemon,
  favorites,
  onAddFavorite,
  onRemoveFavorite,
}) {
  const primaryType = pokemon.types[0].type.name;

  const primaryColor =
    pokemonTypeColors[primaryType] || "#ef5350";

  const favoritePokemon = favorites.find(
    (favorite) => favorite.pokemonId === pokemon.id
  );

  const isFavorite = Boolean(favoritePokemon);

  function handleFavoriteClick() {
    if (isFavorite) {
      onRemoveFavorite(favoritePokemon.id);
    } else {
      onAddFavorite(pokemon);
    }
  }

  return (
    <article
      className="pokemon-card"
      style={{
        "--pokemon-color": primaryColor,
      }}
    >
      <div className="pokemon-card__header">
        <span className="pokemon-card__number">
          #{String(pokemon.id).padStart(3, "0")}
        </span>

        <span className="pokemon-card__primary-type">
          {primaryType}
        </span>
      </div>

      <img
        className="pokemon-card__image"
        src={pokemon.sprites.front_default}
        alt={`Imagen de ${pokemon.name}`}
        loading="lazy"
      />

      <div className="pokemon-card__name-row">
        <h3 className="pokemon-card__name">
          {pokemon.name}
        </h3>

        <button
          className={`pokemon-card__favorite-button ${
            isFavorite
              ? "pokemon-card__favorite-button_active"
              : ""
          }`}
          type="button"
          onClick={handleFavoriteClick}
          aria-label={
            isFavorite
              ? `Quitar ${pokemon.name} de favoritos`
              : `Agregar ${pokemon.name} a favoritos`
          }
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </div>

      <p className="pokemon-card__info">
        Altura: {pokemon.height}
      </p>

      <p className="pokemon-card__info">
        Peso: {pokemon.weight}
      </p>

      <div className="pokemon-card__types">
        {pokemon.types.map((typeInfo) => {
          const typeName = typeInfo.type.name;

          const typeColor =
            pokemonTypeColors[typeName] || "#6b7280";

          return (
            <span
              className="pokemon-card__type"
              key={typeName}
              style={{
                backgroundColor: typeColor,
              }}
            >
              {typeName}
            </span>
          );
        })}
      </div>

      <ul className="pokemon-card__stats">
        {pokemon.stats.map((statInfo) => (
          <li
            className="pokemon-card__stat"
            key={statInfo.stat.name}
          >
            <div className="pokemon-card__stat-header">
              <span>
                {statInfo.stat.name}
              </span>

              <span>
                {statInfo.base_stat}
              </span>
            </div>

            <div className="pokemon-card__stat-bar">
              <div
                className="pokemon-card__stat-value"
                style={{
                  width: `${Math.min(
                    statInfo.base_stat,
                    100
                  )}%`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default PokemonCard;