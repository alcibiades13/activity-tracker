import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faBell,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" onClick={toggleMenu}>
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </button>
        <button className="new-entry-btn">+ New Entry</button>
      </div>

      <div className="header-right">
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input type="text" placeholder="Search" />
        </div>

        {/* <FontAwesomeIcon icon={faBell} className="icon notification" /> */}
        <div className="notification-icon">
          <FontAwesomeIcon icon={faBell} className="bell-icon" />
          <span className="notification-badge">3</span>
        </div>

        <div className="user-profile">
          <img src="images/user-2.jpg" alt="user" className="user-icon" />
          <span className="user-name">Dejan</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
