import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { IoExitOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import "./Header.scss";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Link to="/">
            <img src="./s.png" alt="Logo" width="100px" />
          </Link>

          <div className="header__icons">
            <IoIosSearch className="icon" />

            {!isAuthenticated ? (
              <Link to="/login" className="login-btn">
                <IoExitOutline /> Login
              </Link>
            ) : (
              <div className="profile">
                <CgProfile className="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} />

                {isMenuOpen && (
                  <div className="dropdown-menu">
                    <Link to="/profile">Profile</Link>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
