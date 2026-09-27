import "./NothingFound.css";

function NothingFound() {
  return (
    <section className="nothing-found">
      <h2 className="nothing-found__title">
        No se encontró ningún Pokémon
      </h2>

      <p className="nothing-found__text">
        Revisa el nombre e intenta realizar otra búsqueda.
      </p>
    </section>
  );
}

export default NothingFound;