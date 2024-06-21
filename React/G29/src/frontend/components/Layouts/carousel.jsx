import React from "react";
import { useProducts } from './products';

export default function Carousel() {
  const { products } = useProducts();

  // Filter products where isCarousel is true
  const carouselProducts = products.filter(product => product.isCarousel);

  // If products are still loading or empty, display a loading indicator or fallback content
  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {carouselProducts.map((product, index) => (
          <div className={`carousel-item ₹{index === 0 ? 'active' : ''}`} key={index}>
            <img
  src={product.image_url}
  className="d-block w-100"
  style={{ height: '700px', width: '100px !important' }}
  alt={product.name}
/>

          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
