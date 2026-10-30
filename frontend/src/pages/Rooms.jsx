import React, { useEffect, useState } from 'react';
import API from '../api/axiosInstance';
import RoomCard from '../components/RoomCard';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [category, setCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      let query = '/rooms?';
      if (category) query += `category=${category}&`;
      if (maxPrice) query += `maxPrice=${maxPrice}&`;
      const { data } = await API.get(query);
      setRooms(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [category, maxPrice]);

  return (
    <div className="container py-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-3 border-bottom gap-3">
        <div>
          <h3 className="fw-bold mb-1">Available Accommodations</h3>
          <p className="text-muted mb-0">Select your preferred dates and room standard</p>
        </div>
        <div className="d-flex gap-2">
          <select
            className="form-select form-select-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Standard">Standard</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Executive Suite">Executive Suite</option>
            <option value="Presidential Suite">Presidential Suite</option>
          </select>
          <input
            type="number"
            className="form-control form-control-sm"
            placeholder="Max Price (₹)"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            style={{ width: '140px' }}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : rooms.length === 0 ? (
        <div className="alert alert-secondary text-center my-5">
          No rooms matching the selected parameters currently exist.
        </div>
      ) : (
        <div className="row">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Rooms;