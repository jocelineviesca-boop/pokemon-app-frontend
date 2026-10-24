import "./Header.css";
import Navigation from "../Navigation/Navigation.jsx";

function Header({
  isLoggedIn,
  onLoginClick,
  onLogout,
}) {
  return (
    <header className="header">
      <h1 className="header__title">
        Pokémon App
      </h1>

      <Navigation
        isLoggedIn={isLoggedIn}
        onLoginClick={onLoginClick}
        onLogout={onLogout}
      />
    </header>
  );
}

export default Header;