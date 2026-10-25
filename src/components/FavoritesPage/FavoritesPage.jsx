import "./FavoritesPage.css";

function FavoritesPage({
  favorites,
  onRemoveFavorite,
}) {
  return (
    <main className="favorites-page">
      <h2 className="favorites-page__title">
        Mis Pokémon favoritos
      </h2>

      {favorites.length === 0 ? (
        <p className="favorites-page__empty">
          Todavía no tienes Pokémon guardados.
        </p>
      ) : (
        <div className="favorites-page__list">
          {favorites.map((favorite) => (
            <article
              className="favorites-page__card"
              key={favorite._id}
            >
              <button
                className="favorites-page__delete"
                type="button"
                onClick={() =>
                  onRemoveFavorite(favorite._id)
                }
                aria-label={`Eliminar ${favorite.name} de favoritos`}
                title="Eliminar favorito"
              >
                🗑
              </button>

              <img
                className="favorites-page__image"
                src={favorite.image}
                alt={favorite.name}
              />

              <h3 className="favorites-page__name">
                {favorite.name}
              </h3>

              <p className="favorites-page__type">
                {favorite.type}
              </p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default FavoritesPage;