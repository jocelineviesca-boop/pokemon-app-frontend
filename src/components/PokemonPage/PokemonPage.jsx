import "./PokemonPage.css";

import SearchForm from "../SearchForm/SearchForm.jsx";
import PokemonCard from "../PokemonCard/PokemonCard.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import NothingFound from "../NothingFound/NothingFound.jsx";
import PokemonCardList from "../PokemonCardList/PokemonCardList.jsx";

function PokemonPage({
  pokemon,
  pokemonList,
  isLoading,
  isListLoading,
  error,
  onSearch,
  searchTerm,
}) {
  return (
    <main className="pokemon-page">
      <h2 className="pokemon-page__title">
        {searchTerm
          ? `Resultado para: ${searchTerm}`
          : "Busca un Pokémon"}
      </h2>

      <SearchForm
        onSearch={onSearch}
        isLoading={isLoading}
      />

      {isLoading && <Preloader />}

      {pokemon && <PokemonCard pokemon={pokemon} />}

      {error === "not-found" && <NothingFound />}

      {error === "api-error" && (
        <p className="pokemon-page__error">
          Lo sentimos, algo ha salido mal durante la solicitud. Es posible que
          haya un problema de conexión o que el servidor no funcione. Por favor,
          inténtalo más tarde.
        </p>
      )}

      {isListLoading && <Preloader />}

      {!isListLoading && pokemonList.length > 0 && (
        <PokemonCardList pokemonList={pokemonList} />
      )}
    </main>
  );
}

export default PokemonPage;