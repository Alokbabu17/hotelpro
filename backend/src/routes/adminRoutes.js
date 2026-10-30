const express = require('express');
const router = express.Router();
const { getDashboardStats, getAllUsers } = require('../controllers/adminController');
const { protect } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');

router.get('/stats', protect, authorizeRoles('admin'), getDashboardStats);
router.get('/users', protect, authorizeRoles('admin'), getAllUsers);

module.exports = router;