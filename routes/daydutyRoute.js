const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/addController');


router.post('/', uploadController.uploadDayduty);

module.exports = router;