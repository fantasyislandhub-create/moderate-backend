const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/auth');

router.post('/login', authController.login);
router.post('/change-password', authenticateToken, authController.changePassword);
router.post('/change-email', authenticateToken, authController.changeEmail);
router.get('/verify', authenticateToken, authController.verify);

module.exports = router;
