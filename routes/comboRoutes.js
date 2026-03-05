const express = require('express');
const router = express.Router();
const comboController = require('../controllers/comboController');
const authenticateToken = require('../middleware/auth');
const { storage } = require('../config/cloudinary');
const multer = require('multer');
const upload = multer({ storage });

router.get('/', comboController.getAllCombos);
router.get('/:id', comboController.getComboById);
router.post('/', authenticateToken, upload.array('images', 10), comboController.createCombo);
router.put('/:id', authenticateToken, upload.array('images', 10), comboController.updateCombo);
router.delete('/:id', authenticateToken, comboController.deleteCombo);

module.exports = router;
