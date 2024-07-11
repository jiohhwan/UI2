const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { uploadImage } = require('../controllers/uploadController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get('/uploadimg', (req, res) => {
  res.render('uploadimg');
});

router.post('/uploadimg', upload.single('image'), uploadImage);

module.exports = router;