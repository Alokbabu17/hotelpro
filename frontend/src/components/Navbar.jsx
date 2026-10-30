import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4 tracking-wide text-primary" to="/">
          Hotel<span className="text-white">Pro</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-3">
            <li className="nav-item">
              <Link className="nav-link text-white-50" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white-50" to="/rooms">Explore Rooms</Link>
            </li>
            {user?.role === 'guest' && (
              <li className="nav-item">
                <Link className="nav-link text-white-50" to="/dashboard">My Bookings</Link>
              </li>
            )}
            {user?.role === 'staff' && (
              <li className="nav-item">
                <Link className="nav-link text-white-50" to="/staff">Operations</Link>
              </li>
            )}
            {user?.role === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link text-white-50" to="/admin">Admin Hub</Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-3">
            {user ? (
              <>
                <span className="badge bg-secondary px-3 py-2 text-uppercase fw-normal">
                  {user.name} ({user.role})
                </span>
                <button onClick={handleLogout} className="btn btn-outline-danger btn-sm px-3">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-light btn-sm px-3">Sign In</Link>
                <Link to="/register" className="btn btn-primary btn-sm px-3">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;