import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">
            SafeHaven
          </Link>
          <nav className="nav">
            <Link to="/">Home</Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard">Dashboard</Link>
                <span className="user-info">
                  {user?.fullName} ({user?.role})
                </span>
                <button onClick={logout} className="logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="main-content">{children}</main>
      <footer className="footer">
        <p>&copy; 2024 SafeHaven. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
