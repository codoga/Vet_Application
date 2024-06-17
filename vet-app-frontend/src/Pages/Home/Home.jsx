import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleWelcomeClick = () => {
    navigate('/customer');
  };

  return (
    <div className="center-content">
      <i className="fas fa-paw fa-5x vet-icon"></i>
      <button className="welcome-btn" onClick={handleWelcomeClick}>Welcome</button>
      <h5 className="info-text">Welcome to our veterinary web portal, your trusted partner for pet health and care.</h5>
    </div>
  );
};

export default Home;

