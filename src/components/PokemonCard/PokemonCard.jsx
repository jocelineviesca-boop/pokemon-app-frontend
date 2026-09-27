import "./PokemonCard.css";

function PokemonCard({ pokemon }) {
  return (
    <article className="pokemon-card">
      <img
        className="pokemon-card__image"
        src={pokemon.sprites.front_default || fallbackImage}
        alt={`Imagen de ${pokemon.name}`}
        loading="lazy"
      />

      <h3 className="pokemon-card__name">
        {pokemon.name}
      </h3>

      <p className="pokemon-card__info">
        Altura: {pokemon.height}
      </p>

      <p className="pokemon-card__info">
        Peso: {pokemon.weight}
      </p>

      <div className="pokemon-card__types">
        {pokemon.types.map((typeInfo) => (
          <span
            className="pokemon-card__type"
            key={typeInfo.type.name}
          >
            {typeInfo.type.name}
          </span>
        ))}
      </div>

      <ul className="pokemon-card__stats">
        {pokemon.stats.map((statInfo) => (
          <li
            className="pokemon-card__stat"
            key={statInfo.stat.name}
          >
            {statInfo.stat.name}: {statInfo.base_stat}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default PokemonCard;