import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./product_description.css";
import { API_BASE_URL } from "../../../components/constants";

const ProductDescription = () => {
  const { productId } = useParams();
  const history = useHistory();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(API_BASE_URL + "product-description", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: productId }),
        });

        if (response.ok) {
          const data = await response.json();
          setProduct(data.product);
          setReviews(data.reviews);
        } else {
          const errorData = await response.json();
          setError(errorData.error);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        setError("An error occurred while fetching the product");
      }
    };

    fetchProduct();
  }, [productId]);

  const addToCart = () => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('token') !== null;
  
    if (!isLoggedIn) {
      // User is not logged in, show alert and redirect to login page
      alert('Please log in to add items to your cart.');
      // Redirect to login page (replace '/login' with your actual login route)
      window.location.href = '/login'; 
      return;
    }
  
    // Proceed with adding item to cart if user is logged in
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
  
    if (existingItemIndex !== -1) {
      // Product already exists in cart, update quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += parseInt(quantity);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      // Product not found in cart, add new item
      const cartItem = { ...product, quantity: parseInt(quantity) };
      cart.push(cartItem);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  
    window.dispatchEvent(new Event('storage'));
  };
  
  

  const handleShopNowClick = () => {
    if (!localStorage.getItem("token")) {
      history.push("/login"); // Redirect to login if not logged in
    } else {
      // Redirect to checkout page with product details
      history.push({
        pathname: "/checkout",
        state: { product },
      });
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="col-lg-8 border p-3 main-section bg-white">
        <div className="row heading m-0 pl-3 pt-0 pb-3">{product.name}</div>
        <div className="row m-0">
          <div className="col-lg-4 left-side-product-box pb-3">
            <img
              src={product.image_url}
              className="border p-3"
              alt={product.name}
            />
            <span className="sub-img">
              {product.sub_images &&
                product.sub_images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    className="border p-2"
                    alt="Product thumbnail"
                  />
                ))}
            </span>
          </div>
          <div className="col-lg-8">
            <div className="right-side-pro-detail border p-3 m-0">
              <div className="row">
                <div className="col-lg-12">
                  <span>G29</span>
                  <p className="m-0 p-0">Price</p>
                </div>
                <div className="col-lg-12">
                  <p className="m-0 p-0 price-pro">₹{product.price}</p>
                  <hr className="p-0 m-0" />
                </div>
                <div className="col-lg-12 pt-2">
                  <h5>Product Description</h5>
                  <span>{product.description}</span>
                  <hr className="m-0 pt-2 mt-2" />
                </div>
                <div className="col-lg-12 pt-2">
                  <h5>Fabric</h5>
                  <span>{product.fabric}</span>
                  <hr className="m-0 pt-2 mt-2" />
                </div>
                <div className="col-lg-12 pt-2">
                  <h5>Color</h5>
                  <span>{product.color}</span>
                  <hr className="m-0 pt-2 mt-2" />
                </div>
                <div className="col-lg-12">
                  <h6>Quantity :</h6>
                  <input
                    type="number"
                    className="form-control text-center w-100"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="col-lg-12 mt-3">
                  <div className="row">
                    <div className="col-lg-6 pb-2">
                      <button
                        className="btn btn-danger w-100"
                        onClick={addToCart}
                      >
                        Add To Cart
                      </button>
                    </div>
                    {/* <div className="col-lg-6">
                      <button
                        className="btn btn-success w-100"
                        onClick={handleShopNowClick} 
                      >
                        Shop Now
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Display Reviews */}
        <div className="row mt-3">
          <div className="col-lg-12">
            <h4>Reviews</h4>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="review">
                  <p>
                    <strong>{review.customer_name}</strong> rated it{" "}
                    {review.rating}/5
                  </p>
                  <p>{review.review}</p>
                  <hr />
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 text-center pt-3">
            <h4>More Products</h4>
          </div>
        </div>
        <div className="row mt-3 p-0 text-center pro-box-section">
          {product.more_products &&
            product.more_products.map((img, index) => (
              <div key={index} className="col-lg-3 pb-2">
                <div className="pro-box border p-0 m-0">
                  <img src={img} alt="Product" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
