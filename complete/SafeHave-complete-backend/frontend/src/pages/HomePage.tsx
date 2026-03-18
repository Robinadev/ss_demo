import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-page">
      <section className="hero">
        <h1>SafeHaven - Report Violence, Abuse & Bullying</h1>
        <p>A confidential platform to report and get help with violence, abuse, and bullying.</p>
        {!isAuthenticated && (
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Login
            </Link>
          </div>
        )}
      </section>

      <section className="features">
        <h2>Why Choose SafeHaven?</h2>
        <div className="features-grid">
          <div className="feature">
            <h3>Confidential</h3>
            <p>Your identity and reports are protected with encryption.</p>
          </div>
          <div className="feature">
            <h3>Professional Support</h3>
            <p>Connect with trained professionals and counselors.</p>
          </div>
          <div className="feature">
            <h3>AI-Powered Classification</h3>
            <p>Automatic case classification for faster response.</p>
          </div>
          <div className="feature">
            <h3>Secure Tracking</h3>
            <p>Track your cases and communicate securely.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
