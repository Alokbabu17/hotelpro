import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axiosInstance';
import RoomCard from '../components/RoomCard';

const Home = () => {
  const [featuredRooms, setFeaturedRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await API.get('/rooms');
        setFeaturedRooms(data.slice(0, 3));
      } catch (err) {
        console.error(err);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div>
      <section className="hero-banner text-center text-white py-5">
        <div className="container py-5">
          <h1 className="display-4 fw-bold mb-3">Streamlined Hospitality Management</h1>
          <p className="lead col-lg-8 mx-auto mb-4 text-light">
            Effortless reservations, real-time guest services, and intelligent hotel operations tailored for modern stays.
          </p>
          <Link to="/rooms" className="btn btn-primary btn-lg px-4 shadow">
            Book Your Stay
          </Link>
        </div>
      </section>

      <section className="py-5 container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Featured Accommodations</h2>
          <p className="text-muted">Handpicked selection of our finest suites and rooms</p>
        </div>
        <div className="row">
          {featuredRooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
        <div className="text-center mt-3">
          <Link to="/rooms" className="btn btn-outline-dark px-4">
            Browse All Rooms
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;