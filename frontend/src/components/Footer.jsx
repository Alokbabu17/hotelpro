import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white-50 py-4 mt-auto border-top border-secondary">
      <div className="container text-center">
        <p className="mb-1 text-white fw-medium">HotelPro Management Suite</p>
        <small>&copy; {new Date().getFullYear()} HotelPro. All rights reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;