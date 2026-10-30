const express = require('express');
const router = express.Router();
const {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom
} = require('../controllers/roomController');
const { protect } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');

router.get('/', getAllRooms);
router.get('/:id', getRoomById);
router.post('/', protect, authorizeRoles('admin'), createRoom);
router.put('/:id', protect, authorizeRoles('admin', 'staff'), updateRoom);
router.delete('/:id', protect, authorizeRoles('admin'), deleteRoom);

module.exports = router;