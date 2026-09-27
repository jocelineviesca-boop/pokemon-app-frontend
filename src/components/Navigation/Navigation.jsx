import "./Navigation.css";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navigation">
      <Link className="navigation__link" to="/">
        Inicio
      </Link>

      <Link className="navigation__link" to="/pokemon">
        Pokémon
      </Link>
    </nav>
  );
}

export default Navigation;