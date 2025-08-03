const express = require('express');
const router = express.Router();
const ondutyController = require('../controllers/ondutyController');

router.post('/save', ondutyController.saveOnDuty);
router.get('/next-id', ondutyController.getNextOnDutyNumber);
router.get('/all', ondutyController.getAllOnDutyApplications);

module.exports = router;
