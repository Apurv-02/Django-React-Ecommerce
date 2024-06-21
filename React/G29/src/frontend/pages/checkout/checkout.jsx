import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import "./checkout.css";
import { API_BASE_URL } from "../../components/constants";

const Checkout = () => {
  const location = useLocation();
  const history = useHistory();
  const [cartItems, setCartItems] = useState([]);
  const [customerId, setCustomerId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    username: "",
    email: "",
    area: "",
    country: "",
    city: "",  // Updated to use city instead of state
    zip: "",
    paymentMethod: "credit",
  });
  const [cities, setCities] = useState([]); // State to hold city options

  useEffect(() => {
    if (location.state && location.state.cart) {
      setCartItems(location.state.cart);
    }
    fetchCustomerDetails();
    fetchCities(); // Fetch cities when component mounts
  }, [location]);

  const fetchCustomerDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.get(API_BASE_URL + "get-customer-details", {
        headers: {
          Authorization: `jwt ${token}`,
        },
      });

      const { data } = response;
      if (data) {
        setCustomerId(data.id); // Store customer ID
        setFormData({
          id: data.id || 0,
          name: data.name || "",
          email: data.email || "",
          area: data.area || "",
          country: data.country || "",
          city: data.city || "",  // Use city instead of state
          zip: data.zip || "",
          paymentMethod: "credit",
        });
        setCities(data.cities || []); // Set cities from API response
      }
    } catch (error) {
      console.error("Error fetching customer details:", error);
    }
  };

  const fetchCities = async () => {
    try {
      // Fetch cities data from API endpoint
      const response = await axios.get(API_BASE_URL + "get-cities");
      setCities(response.data); // Assuming response.data is an array of cities
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (paymentMethod === "razorpay") {
      openRazorpay();
    } else {
      handleCOD();
    }
  };

  const openRazorpay = () => {
    const options = {
      key: "your_razorpay_key", // Replace with your Razorpay key
      amount: calculateTotalPrice() * 100, // Amount in paise
      currency: "INR",
      name: "G29 MEN AND WOMEN WEAR",
      description: "Test Transaction",
      handler: (response) => {
        handlePaymentSuccess(response);
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: "9999999999",
      },
      notes: {
        area: formData.area,
      },
      theme: {
        color: "#3399cc",
      },
      modal: {
        ondismiss: () => {
          alert("Payment failed. Please try again.");
        },
      },
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error opening Razorpay:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handlePaymentSuccess = (response) => {
    const { razorpay_payment_id } = response;
    const payload = {
      razorpay_payment_id,
      amount: calculateTotalPrice(),
      customer: {
        customerId: formData.id,
        name: formData.name,
        email: formData.email,
        area: formData.area,
        country: formData.country,
        city: formData.city,  // Use city instead of state
        zip: formData.zip,
      },
      cart: cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      payment_mode: "razorpay",
    };

    axios
      .post(API_BASE_URL + "create-sales-order", payload)
      .then((response) => {
        localStorage.removeItem('cart');
        window.dispatchEvent(new Event("storage"));
        history.push("/success");
      })
      .catch((error) => {
        console.error("Error creating sales order:", error);
        alert("Failed to create sales order. Please try again.");
      });
  };

  const handleCOD = () => {
    const payload = {
      amount: calculateTotalPrice(),
      customer: {
        customerId: formData.id,
        name: formData.name,
        email: formData.email,
        area: formData.area,
        country: formData.country,
        city: formData.city,  // Use city instead of state
        zip: formData.zip,
      },
      cart: cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      payment_mode: "cod",
    };

    axios
      .post(API_BASE_URL + "create-sales-order", payload)
      .then((response) => {
        localStorage.removeItem('cart');
        window.dispatchEvent(new Event("storage"));
        history.push("/success");
      })
      .catch((error) => {
        console.error("Error creating sales order:", error);
        alert("Failed to create sales order. Please try again.");
      });
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your cart</span>
            <span className="badge badge-secondary badge-pill">
              {cartItems.length}
            </span>
          </h4>
          <ul className="list-group mb-3">
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between lh-condensed"
              >
                <div className="d-flex">
                  <img
                    src={item.image_url}
                    className="img-fluid rounded-3"
                    alt={item.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "10px",
                    }}
                  />
                  <div>
                    <h6 className="my-0">{item.name}</h6>
                    <small className="text-muted">{item.description}</small>
                  </div>
                </div>
                <span className="text-muted">
                  ₹{item.price * item.quantity}
                </span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (INR)</span>
              <strong>₹{calculateTotalPrice().toFixed(2)}</strong>
            </li>
          </ul>
        </div>
        <div className="col-md-8 order-md-1">
          <h4 className="mb-3">Billing area</h4>
          <form className="needs-validation" noValidate onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  readOnly
                />
                <div className="invalid-feedback">Valid name is required.</div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  readOnly
                />
                <div className="invalid-feedback">
                  Please enter a valid email area.
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mb-3">
                <label htmlFor="area">area</label>
                <input
                  type="text"
                  className="form-control"
                  id="area"
                  name="area"
                  placeholder="1234 Main St"
                  value={formData.area}
                  onChange={handleInputChange}
                  readOnly
                />
                <div className="invalid-feedback">Please enter your area.</div>
              </div>
              
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  placeholder=""
                  value={formData.city}
                  onChange={handleInputChange}
                  readOnly
                />
                <div className="invalid-feedback">City is required.</div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="zip">Zip</label>
                <input
                  type="text"
                  className="form-control"
                  id="zip"
                  name="zip"
                  placeholder=""
                  value={formData.zip}
                  onChange={handleInputChange}
                  readOnly
                />
                <div className="invalid-feedback">Zip code required.</div>
              </div>
            </div>
            <hr className="mb-4" />
            <h4 className="mb-3">Payment</h4>
            <div className="d-block my-3">
              <div className="custom-control custom-radio">
                <input
                  id="razorpay"
                  name="paymentMethod"
                  type="radio"
                  className="custom-control-input"
                  value="razorpay"
                  checked={paymentMethod === "razorpay"}
                  onChange={handlePaymentMethodChange}
                  required
                />
                <label className="custom-control-label" htmlFor="razorpay">
                  Razorpay
                </label>
              </div>
              <div className="custom-control custom-radio">
                <input
                  id="cod"
                  name="paymentMethod"
                  type="radio"
                  className="custom-control-input"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={handlePaymentMethodChange}
                  required
                />
                <label className="custom-control-label" htmlFor="cod">
                  Cash on Delivery
                </label>
              </div>
            </div>
            <button  style={{marginBottom: '247px'}}
              className="btn btn-primary btn-lg btn-block "
              type="submit"
            >
              Make Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
