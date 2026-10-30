const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Room = require('./models/Room');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    await User.deleteMany();
    await Room.deleteMany();

    const users = await User.create([
      {
        name: 'Admin User',
        email: 'admin@hotelpro.com',
        password: 'password123',
        role: 'admin',
        phone: '9876543210'
      },
      {
        name: 'Staff Manager',
        email: 'staff@hotelpro.com',
        password: 'password123',
        role: 'staff',
        phone: '9876543211'
      },
      {
        name: 'Alok Guest',
        email: 'guest@hotelpro.com',
        password: 'password123',
        role: 'guest',
        phone: '9876543212'
      }
    ]);

    const rooms = await Room.create([
      {
        roomNumber: '101',
        title: 'Deluxe Ocean View Room',
        category: 'Deluxe',
        pricePerNight: 3500,
        capacity: 2,
        amenities: ['High-speed Wi-Fi', 'King Bed', 'AC', 'Mini Fridge', 'Smart TV'],
        images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'],
        status: 'available',
        housekeepingStatus: 'clean',
        description: 'Spacious deluxe room with premium interiors and city view.'
      },
      {
        roomNumber: '201',
        title: 'Executive Business Suite',
        category: 'Executive Suite',
        pricePerNight: 5500,
        capacity: 3,
        amenities: ['Work Desk', 'King Bed', 'Bathtub', 'Balcony', 'Breakfast Included'],
        images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'],
        status: 'available',
        housekeepingStatus: 'clean',
        description: 'Designed for professionals with dedicated workspace and lounge.'
      },
      {
        roomNumber: '301',
        title: 'Presidential Royal Suite',
        category: 'Presidential Suite',
        pricePerNight: 12000,
        capacity: 4,
        amenities: ['Private Jacuzzi', 'Living Area', 'Butler Service', 'Panoramic View'],
        images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80'],
        status: 'available',
        housekeepingStatus: 'clean',
        description: 'Ultra-luxury suite offering unmatched comfort and private dining.'
      },
      {
        roomNumber: '102',
        title: 'Standard Comfort Room',
        category: 'Standard',
        pricePerNight: 2200,
        capacity: 2,
        amenities: ['Wi-Fi', 'Queen Bed', 'Attached Washroom', 'Coffee Maker'],
        images: ['https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80'],
        status: 'available',
        housekeepingStatus: 'clean',
        description: 'Comfortable, budget-friendly accommodation with essential amenities.'
      }
    ]);

    console.log('Database seeded successfully with Users and Rooms!');
    process.exit();
  } catch (error) {
    console.error(`Error Seeding Data: ${error.message}`);
    process.exit(1);
  }
};

seedData();