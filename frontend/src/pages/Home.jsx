import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <h1 className="hero-title">Employee Management System</h1>
        <p className="hero-subtitle">
          A simple and efficient way to manage your employee records.
          Add, view, and organize your team all in one place.
        </p>
        <Link to="/employees" className="btn btn-hero">
          Go to Employee Directory
        </Link>
      </section>

      <section className="features-section">
        <h2 className="features-heading">Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">+</div>
            <h3>Add Employees</h3>
            <p>Create new employee records with comprehensive details including contact info, department, and salary.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#x1F4CB;</div>
            <h3>View Directory</h3>
            <p>Browse all employees in a clean, paginated table with sorting support.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#x1F5D1;</div>
            <h3>Manage Records</h3>
            <p>Easily delete employee records when needed with a simple confirmation flow.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
