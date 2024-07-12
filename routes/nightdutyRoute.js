const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/addController');


router.post('/', uploadController.uploadNightduty);

module.exports = router;