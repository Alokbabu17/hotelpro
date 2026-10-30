import React, { useEffect, useState, useContext } from 'react';
import API from '../api/axiosInstance';
import { AuthContext } from '../context/AuthContext';

const GuestDashboard = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const { data } = await API.get('/bookings/my-bookings');
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm('Confirm booking cancellation?')) return;
    try {
      await API.put(`/bookings/${id}/cancel`);
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message || 'Cancellation error');
    }
  };

  return (
    <div className="container py-5">
      <div className="mb-4 pb-2 border-bottom">
        <h3 className="fw-bold">Guest Portal</h3>
        <p className="text-muted mb-0">Welcome, {user?.name}. Manage active and prior room reservations.</p>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : bookings.length === 0 ? (
        <div className="alert alert-secondary text-center my-4">
          No bookings recorded yet.
        </div>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover align-middle mb-0 bg-white">
            <thead className="table-light">
              <tr>
                <th>Room</th>
                <th>Category</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Paid</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td className="fw-medium">{b.room?.title || 'Suite Room'}</td>
                  <td>{b.room?.category || 'Standard'}</td>
                  <td>{new Date(b.checkInDate).toLocaleDateString()}</td>
                  <td>{new Date(b.checkOutDate).toLocaleDateString()}</td>
                  <td>₹{b.totalAmount}</td>
                  <td>
                    <span
                      className={`badge px-2 py-1 ${
                        b.bookingStatus === 'confirmed'
                          ? 'bg-success'
                          : b.bookingStatus === 'cancelled'
                          ? 'bg-danger'
                          : 'bg-secondary'
                      }`}
                    >
                      {b.bookingStatus}
                    </span>
                  </td>
                  <td>
                    {b.bookingStatus === 'confirmed' && (
                      <button
                        onClick={() => handleCancel(b._id)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GuestDashboard;