import "./Header.css";
import Navigation from "../Navigation/Navigation.jsx";

function Header() {
  return (
    <header className="header">
      <h1 className="header__title">Pokémon App</h1>
      <Navigation />
    </header>
  );
}

export default Header;