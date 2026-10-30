const User = require('../models/User');
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const Payment = require('../models/Payment');

const getDashboardStats = async (req, res) => {
  try {
    const totalRooms = await Room.countDocuments();
    const availableRooms = await Room.countDocuments({ status: 'available' });
    const bookedRooms = await Room.countDocuments({ status: 'booked' });
    const totalUsers = await User.countDocuments();
    const totalBookings = await Booking.countDocuments();

    const revenueResult = await Payment.aggregate([
      { $match: { paymentStatus: 'success' } },
      { $group: { _id: null, totalRevenue: { $sum: '$amount' } } }
    ]);

    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    res.status(200).json({
      totalRooms,
      availableRooms,
      bookedRooms,
      totalUsers,
      totalBookings,
      totalRevenue
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers
};