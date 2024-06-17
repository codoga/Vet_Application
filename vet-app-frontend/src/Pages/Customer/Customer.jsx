import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Customer.css';

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [update, setUpdate] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
  });

  const [updateCustomer, setUpdateCustomer] = useState({
    id: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
  });

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, [update]);

  const fetchCustomers = () => {
    axios
      .get(`${import.meta.env.VITE_APP_BASEURL}/api/v1/customers`)
      .then((res) => setCustomers(res.data.content))
      .catch((error) => console.error("Error fetching customers:", error));
  };

  const handleNewCustomerInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddNewCustomer = () => {
    axios
      .post(`${import.meta.env.VITE_APP_BASEURL}/api/v1/customers`, newCustomer)
      .then(() => {
        setUpdate(!update);
        setNewCustomer({
          name: '',
          phone: '',
          email: '',
          address: '',
          city: '',
        });
      })
      .catch((error) => console.error('Error adding customer:', error));
  };

  const handleDeleteCustomer = (id) => {
    axios
      .delete(`${import.meta.env.VITE_APP_BASEURL}/api/v1/customers/${id}`)
      .then(() => setUpdate(!update))
      .catch((error) => console.error('Error deleting customer:', error));
  };

  const handleUpdateCustomer = () => {
    const { id } = updateCustomer;
    axios
      .put(`${import.meta.env.VITE_APP_BASEURL}/api/v1/customers/${id}`, updateCustomer)
      .then(() => {
        setUpdate(!update);
        setUpdateCustomer({
          id: '',
          name: '',
          phone: '',
          email: '',
          address: '',
          city: '',
        });
      })
      .catch((error) => console.error('Error updating customer:', error));
  };

  const handleUpdateCustomerInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateCustomerBtn = (selectedCustomer) => {
    setUpdateCustomer({
      id: selectedCustomer.id,
      name: selectedCustomer.name,
      phone: selectedCustomer.phone,
      email: selectedCustomer.email,
      address: selectedCustomer.address,
      city: selectedCustomer.city,
    });
  };

  const handleSearchCustomers = () => {
    if (searchQuery.trim() !== '') {
      axios
        .get(`${import.meta.env.VITE_APP_BASEURL}/api/v1/customers/searchByName?name=${searchQuery}`)
        .then((res) => {
          if (res.data && res.data.content) {
            setCustomers(res.data.content);
          } else {
            setCustomers([]);
          }
        })
        .catch((error) => console.error("Error searching customers:", error));
    } else {
      fetchCustomers(); 
    }
  };
  
  const handleShowAllCustomers = () => {
    fetchCustomers();
    setSearchQuery('');
  };

  return (
    <div className="customer-management">
      <h3>Customer Management</h3>

      <div className="form-section">
        <h5>Add Customer</h5>
        <div className="form-row">
          <input
            type="text"
            placeholder="Name Surname"
            name="name"
            value={newCustomer.name}
            onChange={handleNewCustomerInputChange}
          />
          <input
            type="text"
            placeholder="Phone Number"
            name="phone"
            value={newCustomer.phone}
            onChange={handleNewCustomerInputChange}
          />
          <input
            type="email"
            placeholder="E-mail"
            name="email"
            value={newCustomer.email}
            onChange={handleNewCustomerInputChange}
          />
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={newCustomer.address}
            onChange={handleNewCustomerInputChange}
          />
          <input
            type="text"
            placeholder="City"
            name="city"
            value={newCustomer.city}
            onChange={handleNewCustomerInputChange}
          />
          <button className="btn create-btn" onClick={handleAddNewCustomer}>Create</button>
        </div>
      </div>

      <div className="form-section">
        <h5>Update Customer</h5>
        <div className="form-row">
          <input
            type="text"
            placeholder="Name Surname"
            name="name"
            value={updateCustomer.name}
            onChange={handleUpdateCustomerInputChange}
          />
          <input
            type="text"
            placeholder="Phone Number"
            name="phone"
            value={updateCustomer.phone}
            onChange={handleUpdateCustomerInputChange}
          />
          <input
            type="email"
            placeholder="E-mail"
            name="email"
            value={updateCustomer.email}
            onChange={handleUpdateCustomerInputChange}
          />
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={updateCustomer.address}
            onChange={handleUpdateCustomerInputChange}
          />
          <input
            type="text"
            placeholder="City"
            name="city"
            value={updateCustomer.city}
            onChange={handleUpdateCustomerInputChange}
          />
          <button className="btn update-btn" onClick={handleUpdateCustomer}>Update</button>
        </div>
      </div>

      <div className="form-section">
        <h5>Search Customer</h5>
        <div className="form-row">
          <input
            type="text"
            placeholder="Enter Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn search-btn" onClick={handleSearchCustomers}>Search</button>
        </div>
        <button className="btn showall-btn" onClick={handleShowAllCustomers}>Show All</button>
      </div>

      <h5>Customer List</h5>
      <div className="customer-list">
        <div className="customer-list-header">
          <span>Name Surname</span>
          <span>Phone</span>
          <span>Address</span>
          <span>City</span>
          <span>Email</span>
          <span>Actions</span>
        </div>
        {customers && customers.length > 0 ? (
          customers.map((customer) => (
            <div key={customer.id} className="customer-item">
              <span>{customer.name}</span>
              <span>{customer.phone}</span>
              <span>{customer.address}</span>
              <span>{customer.city}</span>
              <span>{customer.email}</span>
              <span className="customer-actions">
                <button onClick={() => handleDeleteCustomer(customer.id)}>Remove</button>
                <button onClick={() => handleUpdateCustomerBtn(customer)}>Edit</button>
              </span>
            </div>
          ))
        ) : (
          <div>No customers found.</div>
        )}
      </div>
    </div>
  );
}

export default Customer;


