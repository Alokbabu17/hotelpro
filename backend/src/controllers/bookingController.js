const Booking = require('../models/Booking');
const Room = require('../models/Room');
const Payment = require('../models/Payment');

const createBooking = async (req, res) => {
  try {
    const { roomId, checkInDate, checkOutDate, totalAmount, paymentMethod, specialRequests } = req.body;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Selected room not found' });
    }

    if (room.status !== 'available') {
      return res.status(400).json({ message: 'Room is currently unavailable' });
    }

    const booking = await Booking.create({
      user: req.user._id,
      room: roomId,
      checkInDate,
      checkOutDate,
      totalAmount,
      bookingStatus: 'confirmed',
      paymentStatus: 'paid',
      specialRequests
    });

    await Payment.create({
      booking: booking._id,
      user: req.user._id,
      amount: totalAmount,
      method: paymentMethod || 'Card',
      transactionId: 'TXN_' + Date.now() + Math.floor(Math.random() * 1000),
      paymentStatus: 'success'
    });

    room.status = 'booked';
    await room.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('room')
      .sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking record not found' });
    }

    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized cancellation request' });
    }

    booking.bookingStatus = 'cancelled';
    booking.paymentStatus = 'refunded';
    await booking.save();

    await Room.findByIdAndUpdate(booking.room, { status: 'available' });

    res.status(200).json({ message: 'Booking cancelled and refund processed', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  cancelBooking
};