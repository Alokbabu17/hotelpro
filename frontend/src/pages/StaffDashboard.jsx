import React, { useEffect, useState } from 'react';
import API from '../api/axiosInstance';

const StaffDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStaffData = async () => {
    try {
      const { data } = await API.get('/staff/bookings');
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffData();
  }, []);

  const updateBookingStatus = async (id, status) => {
    try {
      await API.put(`/staff/booking/${id}/status`, { status });
      fetchStaffData();
    } catch (err) {
      alert(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="container py-5">
      <div className="mb-4 pb-2 border-bottom">
        <h3 className="fw-bold">Front Desk & Housekeeping Operations</h3>
        <p className="text-muted mb-0">Manage guest arrivals, departures, and active room states.</p>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover align-middle mb-0 bg-white">
            <thead className="table-light">
              <tr>
                <th>Guest</th>
                <th>Room #</th>
                <th>Dates</th>
                <th>Current Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td>
                    <div className="fw-bold">{b.user?.name}</div>
                    <small className="text-muted">{b.user?.phone}</small>
                  </td>
                  <td>{b.room?.roomNumber} - {b.room?.category}</td>
                  <td>
                    {new Date(b.checkInDate).toLocaleDateString()} to{' '}
                    {new Date(b.checkOutDate).toLocaleDateString()}
                  </td>
                  <td>
                    <span className="badge bg-primary text-uppercase">{b.bookingStatus}</span>
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      {b.bookingStatus === 'confirmed' && (
                        <button
                          onClick={() => updateBookingStatus(b._id, 'checked-in')}
                          className="btn btn-success"
                        >
                          Check In
                        </button>
                      )}
                      {b.bookingStatus === 'checked-in' && (
                        <button
                          onClick={() => updateBookingStatus(b._id, 'checked-out')}
                          className="btn btn-warning"
                        >
                          Check Out
                        </button>
                      )}
                    </div>
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

export default StaffDashboard;