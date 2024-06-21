import React from 'react';
import { useProducts } from '../../../components/Layouts/products';
import { Link } from 'react-router-dom';

function Women({ searchQuery }) {
  const { filteredProducts } = useProducts();

  // Filter products for the 'Women' category
  const WomenProducts = filteredProducts.filter(product => product.category.toLowerCase() === 'women');

  // If products are still loading or empty, display a loading indicator or fallback content
  if (filteredProducts.length === 0) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="row">
      {WomenProducts.map((product, index) => (
        <div className="col-lg-3 col-md-12 mb-4" key={index}>
          <Link to={`/product-description/${product.id}`} className="text-reset text-decoration-none"> 
          <div className="card">
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
              <a href="#!">
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
              </a>
            </div>
            <div className="card-body">
              <a href="" className="text-reset">
                <h5 className="card-title mb-3">{product.name}</h5>
              </a>
              <a href="" className="text-reset">
                <p>{product.category}</p>
              </a>
              <h6 className="mb-3">₹{product.price}</h6>
            </div>
          </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Women;
