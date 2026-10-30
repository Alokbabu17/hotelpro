const express = require('express');
const router = express.Router();
const {
  getActiveBookings,
  updateCheckInOut,
  updateHousekeeping
} = require('../controllers/staffController');
const { protect } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');

router.get('/bookings', protect, authorizeRoles('staff', 'admin'), getActiveBookings);
router.put('/booking/:id/status', protect, authorizeRoles('staff', 'admin'), updateCheckInOut);
router.put('/room/:roomId/housekeeping', protect, authorizeRoles('staff', 'admin'), updateHousekeeping);

module.exports = router;