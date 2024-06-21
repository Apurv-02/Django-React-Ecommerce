import React, { createContext, useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { API_BASE_URL } from '../constants';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch(API_BASE_URL + 'home-products')
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  const filterProducts = (query) => {
    if (query) {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  return (
    <ProductContext.Provider value={{ products, filteredProducts, filterProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

const ProductList = () => {
  const { filteredProducts } = useProducts();
  console.log(filteredProducts)

  return (
    <div className="row">
      {filteredProducts.map((product, index) => (
        <div className="col-lg-3 col-md-12 mb-4" key={index}>
          <Link to={`/product-description/${product.id}`} className="text-reset text-decoration-none"> 
            <div className="card"> {/* The entire card is now clickable */}
              <div
                className="bg-image hover-zoom ripple ripple-surface ripple-surface-light p-3"
                data-mdb-ripple-color="light"
              >
                <img
                  src={
                    product.image_url ||
                    "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/belt.webp"
                  }
                  style={{ width: "200px", height: "200px" }} // Adjust the width and height as needed
                  alt={product.name}
                />
                <div className="mask">
                  <div className="d-flex justify-content-start align-items-end h-100">
                    {product.is_new && (
                      <h5>
                        <span className="badge bg-primary ms-2">New</span>
                      </h5>
                    )}
                  </div>
                </div>
                <div className="hover-overlay">
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                  ></div>
                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title mb-3">{product.name}</h5>
                <p>{product.category}</p>
                <h6 className="mb-3">₹{product.price}</h6>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export { ProductList, ProductProvider };
