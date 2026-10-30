import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axiosInstance';
import { AuthContext } from '../context/AuthContext';

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [room, setRoom] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [error, setError] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const { data } = await API.get(`/rooms/${id}`);
        setRoom(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRoom();
  }, [id]);

  const calculateDays = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const diff = new Date(checkOutDate) - new Date(checkInDate);
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    const days = calculateDays();
    if (days <= 0) {
      setError('Check-out date must succeed check-in date');
      return;
    }

    try {
      setBookingLoading(true);
      setError('');
      const totalAmount = days * room.pricePerNight;

      await API.post('/bookings', {
        roomId: room._id,
        checkInDate,
        checkOutDate,
        totalAmount,
        paymentMethod: 'Card',
        specialRequests
      });

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to process reservation');
    } finally {
      setBookingLoading(false);
    }
  };

  if (!room) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  const days = calculateDays();
  const totalCost = days * room.pricePerNight;

  return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-lg-8">
          <img
            src={room.images?.[0] || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'}
            alt={room.title}
            className="img-fluid rounded mb-4 w-100"
            style={{ maxHeight: '420px', objectFit: 'cover' }}
          />
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="badge bg-primary fs-6">{room.category}</span>
            <span className="text-muted">Room No: {room.roomNumber}</span>
          </div>
          <h2 className="fw-bold mb-3">{room.title}</h2>
          <p className="text-secondary">{room.description}</p>

          <h5 className="fw-bold mt-4 mb-3">Amenities</h5>
          <div className="d-flex flex-wrap gap-2 mb-4">
            {room.amenities?.map((item, idx) => (
              <span key={idx} className="badge bg-light text-dark border p-2 fw-normal">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm border-0 p-4 sticky-top" style={{ top: '90px' }}>
            <h4 className="fw-bold mb-3">
              ₹{room.pricePerNight} <small className="text-muted fs-6">/ night</small>
            </h4>

            {error && <div className="alert alert-danger py-2 small">{error}</div>}

            <form onSubmit={handleBooking}>
              <div className="mb-3">
                <label className="form-label small fw-medium">Check-In Date</label>
                <input
                  type="date"
                  className="form-control form-control-sm"
                  required
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-medium">Check-Out Date</label>
                <input
                  type="date"
                  className="form-control form-control-sm"
                  required
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-medium">Special Requests (Optional)</label>
                <textarea
                  className="form-control form-control-sm"
                  rows="2"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Late check-in, extra pillows, etc."
                ></textarea>
              </div>

              {days > 0 && (
                <div className="bg-light p-3 rounded mb-3 small">
                  <div className="d-flex justify-content-between mb-1">
                    <span>Duration:</span>
                    <span>{days} Nights</span>
                  </div>
                  <div className="d-flex justify-content-between fw-bold pt-2 border-top">
                    <span>Total Amount:</span>
                    <span>₹{totalCost}</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={bookingLoading || room.status !== 'available'}
              >
                {room.status !== 'available'
                  ? 'Currently Booked'
                  : bookingLoading
                  ? 'Processing...'
                  : 'Confirm & Reserve'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;