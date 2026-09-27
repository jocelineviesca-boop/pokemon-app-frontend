import "./SearchForm.css";
import { useState } from "react";

function SearchForm({ onSearch, isLoading }) {
  const [query, setQuery] = useState("");
  const [validationError, setValidationError] = useState("");

  function handleChange(event) {
    setQuery(event.target.value);
  }

  function handleSubmit(event) {
  event.preventDefault();

  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    setValidationError("Escribe el nombre de un Pokémon");
    return;
  }

  setValidationError("");
  onSearch(trimmedQuery);
}

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-form__input"
        type="text"
        placeholder="Busca un Pokémon"
        value={query}
        onChange={handleChange}
      />

      <button className="search-form__button" type="submit">
        Buscar
      </button>

      {validationError && (
  <span className="search-form__error">
    {validationError}
  </span>
)}
    </form>
  );
}

export default SearchForm;