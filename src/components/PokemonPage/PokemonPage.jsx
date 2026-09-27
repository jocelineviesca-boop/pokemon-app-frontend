import "./PokemonPage.css";

import SearchForm from "../SearchForm/SearchForm.jsx";
import PokemonCard from "../PokemonCard/PokemonCard.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import NothingFound from "../NothingFound/NothingFound.jsx";

function PokemonPage({
  pokemon,
  isLoading,
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
          Ocurrió un problema al consultar PokéAPI. Intenta nuevamente.
        </p>
      )}
    </main>
  );
}

export default PokemonPage;