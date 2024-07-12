const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/addController');


router.post('/', uploadController.uploadFood);

module.exports = router;