import "./Navigation.css";
import { useContext } from "react";
import { Link } from "react-router-dom";

import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function Navigation({
  isLoggedIn,
  onLoginClick,
  onLogout,
}) {
  
  const currentUser = useContext(CurrentUserContext);

  return (
    <nav className="navigation">
      <Link
        className="navigation__link"
        to="/"
      >
        Inicio
      </Link>

      <Link
        className="navigation__link"
        to="/pokemon"
      >
        Pokémon
      </Link>

      {!isLoggedIn && (
        <button
          className="navigation__button"
          type="button"
          onClick={onLoginClick}
        >
          Iniciar sesión
        </button>
      )}

      {isLoggedIn && (
        <>
          <Link
            className="navigation__link"
            to="/favorites"
          >
            Favoritos
          </Link>

          <span className="navigation__user">
            {currentUser?.name}
          </span>

          <button
            className="navigation__button"
            type="button"
            onClick={onLogout}
          >
            Cerrar sesión
          </button>
        </>
      )}
    </nav>
  );
}

export default Navigation;