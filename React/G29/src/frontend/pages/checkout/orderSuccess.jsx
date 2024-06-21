import React from 'react';
import { useHistory } from 'react-router-dom';
import './orderSuccess.css'; // Create and import a CSS file for styling if needed

const Success = () => {
  const history = useHistory();

  const handleHomeRedirect = () => {
    history.push('/profile');
  };

  return (
    <div className="success-container">
      <div className="success-message">
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your purchase. Your order has been placed successfully.</p>
        <button onClick={handleHomeRedirect} className="btn btn-primary">
          Go to My Orders
        </button>
      </div>
    </div>
  );
};

export default Success;
