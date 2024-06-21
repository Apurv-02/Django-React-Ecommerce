import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

function Cart({ history }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('storage')); // Trigger custom event for cart update
  };

  const updateQuantity = (index, quantity) => {
    const updatedCart = [...cartItems];
    if (quantity === 0) {
      removeItem(index);
    } else {
      updatedCart[index].quantity = quantity;
      updateCart(updatedCart);
    }
  };

  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    updateCart(updatedCart);
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    history.push({
      pathname: "/checkout",
      state: { cart: cartItems }
    });
  };

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#d2c9ff" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div className="card card-registration card-registration-2" style={{ borderRadius: "15px" }}>
              <div className="card-body p-0">
                <div className="row g-0">
                  <div className="col-lg-8">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <h1 className="fw-bold mb-0 text-black">Shopping Cart</h1>
                        <h6 className="mb-0 text-muted">{totalItems} items</h6>
                      </div>
                      <hr className="my-4" />

                      {cartItems.map((item, index) => (
                        <div key={index} className="row mb-4 d-flex justify-content-between align-items-center">
                          <div className="col-md-2 col-lg-2 col-xl-2">
                            <img
                              src={item.image_url}
                              className="img-fluid rounded-3"
                              alt={item.name}
                            />
                          </div>
                          <div className="col-md-3 col-lg-3 col-xl-3">
                            <h6 className="text-muted">{item.name}</h6>
                            <h6 className="text-black mb-0">{item.description}</h6>
                          </div>
                          <div className="col-md-3 col-lg-3 col-xl-2 d-flex align-items-center">
                            <button className="btn btn-link px-2" onClick={() => updateQuantity(index, item.quantity - 1)} disabled={item.quantity <= 0}>
                              <i className="fa fa-minus" aria-hidden="true"></i>
                            </button>
                            <input
                              min="0"
                              name="quantity"
                              value={item.quantity}
                              type="number"
                              className="form-control form-control-sm"
                              onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                            />
                            <button className="btn btn-link px-2" onClick={() => updateQuantity(index, item.quantity + 1)}>
                              <i className="fa fa-plus" aria-hidden="true"></i>
                            </button>
                          </div>
                          <div className="col-md-3 col-lg-2 col-xl-2">
                            <h6 className="mb-0">₹{item.price}</h6>
                          </div>
                          <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                            <a href="#!" className="text-muted" onClick={() => removeItem(index)}><i className="fas fa-times"></i></a>
                          </div>
                        </div>
                      ))}

                      <hr className="my-4" />

                      <div className="pt-5">
                        <h6 className="mb-0"><a href="/" className="text-body"><i className="fas fa-long-arrow-alt-left me-2"></i>Back to shop</a></h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 bg-grey">
                    <div className="p-5">
                      <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-4">
                        <h5 className="text-uppercase">items {totalItems}</h5>
                        <h5>₹{totalPrice.toFixed(2)}</h5>
                      </div>

                      <h5 className="text-uppercase mb-3">Shipping</h5>

                      <div className="mb-4 pb-2">
                        <select className="select">
                          <option value="1">Standard-Delivery- ₹5.00</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                          <option value="4">Four</option>
                        </select>
                      </div>

                      <h5 className="text-uppercase mb-3">Give code</h5>

                      <div className="mb-5">
                        <div className="form-outline">
                          <input type="text" id="form3Examplea2" className="form-control form-control-lg" />
                          <label className="form-label" htmlFor="form3Examplea2">Enter your code</label>
                        </div>
                      </div>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-5">
                        <h5 className="text-uppercase">Total price</h5>
                        <h5>₹{(totalPrice + 5).toFixed(2)}</h5>
                      </div>

                      <button type="button" className="btn btn-dark btn-block btn-lg" data-mdb-ripple-color="dark" onClick={handleCheckout}>Checkout</button>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default withRouter(Cart);
