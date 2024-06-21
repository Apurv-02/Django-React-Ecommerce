import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import './Navbar.css';
import { useProducts } from './products'; // Ensure this import points to the correct path

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const { filterProducts } = useProducts();
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cart.length);
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener('storage', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    filterProducts(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    filterProducts(searchQuery);
  };

  return (
    <section id="Navbar" className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src={logo} alt="Logo" className="rounded me-2" />{" "}
          <span className="resp-name">G29 MEN AND WOMEN WEAR</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/men" className="nav-link">
                MEN
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/women" className="nav-link">
                WOMEN
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                Contact Us
              </Link>
            </li>
          </ul>
          <form className="d-flex mb-2 mb-lg-0" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button type="submit" className="btn btn-primary ms-2">
              Search
            </button>
          </form>
          <div className="navbar-nav ms-md-3 mb-2 mb-lg-0">
            <Link to="/cart" className="nav-link">
              <i className="fa fa-shopping-cart"></i> Cart <span className="badge bg-danger">{cartCount}</span>
            </Link>
            <div className="nav-item dropdown me-md-5">
              <Link
                to="#"
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa fa-user"></i> Profile
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                {localStorage.getItem("token") && (
                  <Link to="/profile" className="dropdown-item">
                    Manage Profile
                  </Link>
                )}
                </li>
                {localStorage.getItem("token") && (
                  <li>
                    <Link to="/logout" className="dropdown-item">
                      Logout
                    </Link>
                  </li>
                )}
                {!localStorage.getItem("token") && (
                  <li>
                    <Link to="/login" className="dropdown-item">
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Navbar;
