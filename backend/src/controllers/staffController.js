const Booking = require('../models/Booking');
const Room = require('../models/Room');

const getActiveBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email phone')
      .populate('room')
      .sort({ checkInDate: 1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCheckInOut = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.bookingStatus = status;
    await booking.save();

    if (status === 'checked-out') {
      await Room.findByIdAndUpdate(booking.room, {
        status: 'available',
        housekeepingStatus: 'dirty'
      });
    }

    res.status(200).json({ message: `Status updated to ${status}`, booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateHousekeeping = async (req, res) => {
  try {
    const { housekeepingStatus } = req.body;
    const room = await Room.findByIdAndUpdate(
      req.params.roomId,
      { housekeepingStatus },
      { new: true }
    );

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getActiveBookings,
  updateCheckInOut,
  updateHousekeeping
};