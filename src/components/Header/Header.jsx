import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
  return (
    <header>
      <nav className="header">
        <ul className="header__left">
          <li className="header__left--item">
            <Link to="/Webshop">Shop</Link>
          </li>
          <li className="header__left--item">
            <Link to="/Scanner">Pollution Scanner</Link>
          </li>
          <li className="header__left--item">Webshop</li>
        </ul>
        <Link to="/">
          <img
            className="header__logo"
            src="/Variables/Assets/Logo.svg"
            alt="Luht Logo"
          />
        </Link>
        <div className="header__right">
          <Link to="/Webshop">
            <img
              className="header__right--shop"
              src="/Variables/Assets/Shop.svg"
              alt="Webshop"
            />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
