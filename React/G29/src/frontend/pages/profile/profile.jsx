import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../components/constants';

const Profile = ({ user, orders }) => {
  const [customerDetails, setCustomerDetails] = useState(null);
  const [ordersList, setOrdersList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedDetails, setEditedDetails] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }

        // Fetch customer details
        const customerResponse = await axios.get(API_BASE_URL + 'get-customer-details', {
          headers: {
            Authorization: `jwt ${token}`,
          },
        });

        const customerData = customerResponse.data;
        setCustomerDetails(customerData);
        setEditedDetails({ ...customerData });

        // Fetch orders based on the user from customer details
        const ordersResponse = await axios.get(API_BASE_URL + 'get-sales-order', {
          params: { user: customerData.id }  // Pass user ID as a query parameter
        });

        const ordersData = ordersResponse.data.map(order => ({
          ...order,
          payment_status_text: order.payment_status ? 'Paid' : 'Pending',
          payment_status_style: order.payment_status ? 'text-success' : 'text-danger',
        }));
        setOrdersList(ordersData);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditedDetails({ ...customerDetails }); // Reset editedDetails to original details
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'city' || name === 'area') {
      // If changing city or area, convert value to number if it's a string (name)
      const intValue = parseInt(value, 10); // Assuming IDs are integers
      setEditedDetails(prevState => ({
        ...prevState,
        [name]: isNaN(intValue) ? value : intValue,
      }));
    } else {
      setEditedDetails(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const updatedDetails = { ...editedDetails };
      if (typeof updatedDetails.city === 'string') {
        // Find the ID of the city from the cities array
        const cityId = customerDetails.cities.find(city => city[1] === updatedDetails.city);
        updatedDetails.city = cityId ? cityId[0] : null; // Use city ID if found, otherwise null
      }
      // Similarly, handle area if needed
      
      const response = await axios.put(API_BASE_URL + 'update-customer-details', updatedDetails, {
        headers: {
          Authorization: `jwt ${token}`,
        },
      });

      // Update customerDetails state directly with the updated data
      setCustomerDetails(prevState => ({
        ...prevState,
        zip: response.data.zip, // Update only the zip code
      }));
      setEditedDetails({ ...response.data });
      setEditMode(false);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Profile Details</h5>
              {loading && <p>Loading profile...</p>}
              {!loading && customerDetails && !editMode && (
                <div>
                  {customerDetails.name && (
                    <p><strong>Name:</strong> {customerDetails.name}</p>
                  )}
                  {customerDetails.email && (
                    <p><strong>Email:</strong> {customerDetails.email}</p>
                  )}
                  {customerDetails.area && (
                    <p><strong>Address:</strong> {customerDetails.area}</p>
                  )}
                  {customerDetails.city && (
                    <p><strong>City:</strong> {customerDetails.city}</p>
                  )}
                  {customerDetails.zip && (
                    <p><strong>Zip:</strong> {customerDetails.zip}</p>
                  )}
                  <button className="btn btn-primary mr-2" onClick={handleEdit}>Edit</button>
                </div>
              )}
              {!loading && customerDetails && editMode && (
                <div>
                  <div className="form-group">
                    <label>Name:</label>
                    <input type="text" className="form-control" name="name" value={editedDetails.name || ''} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input type="text" className="form-control" name="email" value={editedDetails.email || ''} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Address:</label>
                    <input type="text" className="form-control" name="area" value={editedDetails.area || ''} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>City:</label>
                    <select className="form-control" name="city" value={editedDetails.city || ''} onChange={handleChange}>
                      <option value="">Select City</option>
                      {customerDetails.cities && customerDetails.cities.map(city => (
                        <option key={city[0]} value={city[0]}>{city[1]}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Zip:</label>
                    <input type="text" className="form-control" name="zip" value={editedDetails.zip || ''} onChange={handleChange} />
                  </div>
                  <button className="btn btn-primary mr-2" onClick={handleUpdate}>Update</button>
                  <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                </div>
              )}
              {error && <p className="text-danger">{error}</p>}
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Order History</h5>
              {loading && <p>Loading orders...</p>}
              {!loading && ordersList.length === 0 && <p>You haven't placed any orders yet.</p>}
              {!loading && ordersList.length > 0 && (
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Order Number</th>
                        <th>Total Amount</th>
                        <th>Order Date</th>
                        <th>Payment Mode</th>
                        <th>Payment Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ordersList.map(order => (
                        <tr key={order.id}>
                          <td>{order.order_number}</td>
                          <td>₹{order.total_amount}</td>
                          <td>{order.order_date}</td>
                          <td>{order.payment_mode}</td>
                          <td className={order.payment_status ? 'text-success' : 'text-danger'}>
                            {order.payment_status ? 'Paid' : 'Pending'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
