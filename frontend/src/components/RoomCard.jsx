import React from 'react';
import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
  const defaultImage = 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 border-0 shadow-sm">
        <img
          src={room.images?.[0] || defaultImage}
          className="card-img-top"
          alt={room.title}
          style={{ height: '220px', objectFit: 'cover' }}
        />
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1">
              {room.category}
            </span>
            <span className="text-muted small">Max {room.capacity} Guests</span>
          </div>
          <h5 className="card-title fw-bold text-dark">{room.title}</h5>
          <p className="card-text text-secondary small flex-grow-1">
            {room.description || 'Modern accommodation designed for comfort and relaxation.'}
          </p>
          <div className="d-flex flex-wrap gap-1 mb-3">
            {room.amenities?.slice(0, 3).map((item, idx) => (
              <span key={idx} className="badge bg-light text-dark border small fw-normal">
                {item}
              </span>
            ))}
          </div>
          <div className="d-flex justify-content-between align-items-center pt-2 border-top">
            <div>
              <span className="fs-5 fw-bold text-dark">₹{room.pricePerNight}</span>
              <span className="text-muted small"> / night</span>
            </div>
            <Link to={`/rooms/${room._id}`} className="btn btn-outline-primary btn-sm px-3">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;