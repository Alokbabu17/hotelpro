const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      enum: ['Deluxe', 'Executive Suite', 'Standard', 'Presidential Suite']
    },
    pricePerNight: {
      type: Number,
      required: true,
      min: 0
    },
    capacity: {
      type: Number,
      required: true,
      default: 2
    },
    amenities: {
      type: [String],
      default: []
    },
    images: {
      type: [String],
      default: []
    },
    status: {
      type: String,
      enum: ['available', 'booked', 'maintenance'],
      default: 'available'
    },
    housekeepingStatus: {
      type: String,
      enum: ['clean', 'dirty', 'in-progress'],
      default: 'clean'
    },
    description: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Room', roomSchema);