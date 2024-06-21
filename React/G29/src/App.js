import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './App.css';
import SignUp from './frontend/components/signup/signup';
import Login from './frontend/components/login/login';
import Logout from './frontend/components/login/logout';
import Navbar from "./frontend/components/Layouts/Navbar";
import Footer from "./frontend/components/Layouts/Footer";
import Home from './frontend/pages/home/home';
import Contact from './frontend/pages/contact/contact';
import Men from "./frontend/pages/Products/Men/Men";
import Women from "./frontend/pages/Products/Women/Women";
import Success from "./frontend/pages/checkout/orderSuccess";
import Cart from "./frontend/pages/Products/Cart/Cart";
import Profile from "./frontend/pages/profile/profile";
import { ProductProvider, ProductList } from './frontend/components/Layouts/products';
import { useState } from 'react';
import ProductDescription from "./frontend/pages/Products/ProductDescription/productDescription";
import Checkout from "./frontend/pages/checkout/checkout";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const showNavbarAndFooter = !['/login', '/signup'].includes(location.pathname);

  return (
    <div className="App">
      <ProductProvider>
        {showNavbarAndFooter && <Navbar onSearch={setSearchQuery} />}
        <Switch>
          <Route exact path="/">
            <Home searchQuery={searchQuery} />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/success">
            <Success />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/men">
            <Men />
          </Route>
          <Route path="/women">
            <Women />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/product-description/:productId">
            <ProductDescription />
          </Route>
        </Switch>
        {showNavbarAndFooter && <Footer />}
      </ProductProvider>
    </div>
  );
}

function Main() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default Main;
