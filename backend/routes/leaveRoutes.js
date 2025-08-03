const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');

router.post('/apply', leaveController.applyLeave);
router.get('/next-lno',leaveController.getNextLeaveNumber);
router.get('/report',leaveController.getAllLeaves);

module.exports = router;