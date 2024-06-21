// components/Logout.js
import React, { useEffect } from 'react';

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event("storage"));
    // Clear session data from local storage
    localStorage.removeItem('token');

    // Reload the page
    window.location.href = '/';
  }, []);

  return null; // The component doesn't need to render anything
};

export default Logout;
