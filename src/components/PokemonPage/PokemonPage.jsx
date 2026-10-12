import "./PokemonPage.css";

import SearchForm from "../SearchForm/SearchForm.jsx";
import PokemonCard from "../PokemonCard/PokemonCard.jsx";
import PokemonCardList from "../PokemonCardList/PokemonCardList.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import NothingFound from "../NothingFound/NothingFound.jsx";

function PokemonPage({
  pokemon,
  pokemonList,
  favorites,
  favoritesError,
  isLoading,
  isListLoading,
  error,
  onSearch,
  onAddFavorite,
  onRemoveFavorite,
  searchTerm,
}) {
  return (
    <main className="pokemon-page">
      <section className="pokemon-page__content">
        <h2 className="pokemon-page__title">
          {searchTerm
            ? `Resultado para: ${searchTerm}`
            : "Busca un Pokémon"}
        </h2>

        <SearchForm
          onSearch={onSearch}
          isLoading={isLoading}
        />

        {favoritesError === "favorites-error" && (
  <p className="pokemon-page__error">
    Lo sentimos, algo ha salido mal durante la solicitud.
    Es posible que haya un problema de conexión o que el
    servidor no funcione. Por favor, inténtalo más tarde.
  </p>
)}

        {isLoading && <Preloader />}

        {pokemon && (
          <PokemonCard
            pokemon={pokemon}
            favorites={favorites}
            onAddFavorite={onAddFavorite}
            onRemoveFavorite={onRemoveFavorite}
          />
        )}

        {error === "not-found" && <NothingFound />}

        {error === "api-error" && (
          <p className="pokemon-page__error">
            Lo sentimos, algo ha salido mal durante la solicitud.
            Es posible que haya un problema de conexión o que el
            servidor no funcione. Por favor, inténtalo más tarde.
          </p>
        )}

        {isListLoading && <Preloader />}

        {!isListLoading && pokemonList.length > 0 && (
          <PokemonCardList
            pokemonList={pokemonList}
            favorites={favorites}
            onAddFavorite={onAddFavorite}
            onRemoveFavorite={onRemoveFavorite}
          />
        )}
      </section>
    </main>
  );
}

export default PokemonPage;