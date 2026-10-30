import React, { useEffect, useState } from 'react';
import API from '../api/axiosInstance';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [statsRes, usersRes] = await Promise.all([
          API.get('/admin/stats'),
          API.get('/admin/users')
        ]);
        setStats(statsRes.data);
        setUsers(usersRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="mb-4 pb-2 border-bottom">
        <h3 className="fw-bold">Administrative Overview</h3>
        <p className="text-muted mb-0">System health, revenue metrics, and user registries.</p>
      </div>

      <div className="row g-3 mb-5">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-3 bg-primary text-white">
            <h6 className="text-white-50">Total Revenue</h6>
            <h3 className="fw-bold mb-0">₹{stats?.totalRevenue || 0}</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-3 bg-dark text-white">
            <h6 className="text-white-50">Total Reservations</h6>
            <h3 className="fw-bold mb-0">{stats?.totalBookings || 0}</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-3 bg-success text-white">
            <h6 className="text-white-50">Available Rooms</h6>
            <h3 className="fw-bold mb-0">{stats?.availableRooms || 0} / {stats?.totalRooms || 0}</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-3 bg-secondary text-white">
            <h6 className="text-white-50">Registered Users</h6>
            <h3 className="fw-bold mb-0">{stats?.totalUsers || 0}</h3>
          </div>
        </div>
      </div>

      <h5 className="fw-bold mb-3">User Registry</h5>
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-hover align-middle mb-0 bg-white">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Member Since</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td className="fw-medium">{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone || 'N/A'}</td>
                <td>
                  <span className={`badge ${u.role === 'admin' ? 'bg-danger' : u.role === 'staff' ? 'bg-warning text-dark' : 'bg-info'}`}>
                    {u.role}
                  </span>
                </td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;