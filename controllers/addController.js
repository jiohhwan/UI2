const asyncHandler = require('express-async-handler');

const Food = require('../models/foodModel');
const Dayduty = require('../models/daydutyModel');
const Nightduty = require('../models/nightdutyModel');
const Hat = require('../models/hatModel');


//admin
const getadmin = asyncHandler(async(req, res) => {
  const hat = await Hat.findOne({});
  res.render("admin", { hat });
})

//식단표
const getfood = (req, res) => {
  res.render("food", { message: null });
};

const uploadFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    // req.file.buffer에 이미지 데이터가 저장되어 있음 (Multer 메모리 스토리지 때문)
    const imageData = req.file.buffer;
    const fileSize = req.file.size;
    // MongoDB에 이미지 저장
    const food = new Food({
      data: imageData,
      contentType: req.file.mimetype,
      size: fileSize,
    });
    await food.save();
    res.render('food', { message: '식단표가 게시되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).send('식단표를 업데이트하지 못했습니다.');
  }
};


//학생당직표
const getdayduty = (req, res) => {
  res.render("dayduty", { message: null });
};

const uploadDayduty = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    const imageData = req.file.buffer;
    const fileSize = req.file.size;

    const dayduty = new Dayduty({
      data: imageData,
      contentType: req.file.mimetype,
      size: fileSize,
    });
    await dayduty.save();
    res.render('dayduty', { message: '학생당직표가 게시되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).send('학생당직표를 업데이트하지 못했습니다.');
  }
};


//안전당직표
const getnightduty = (req, res) => {
  res.render("nightduty", { message: null });
};

const uploadNightduty = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    const imageData = req.file.buffer;
    const fileSize = req.file.size;

    const nightduty = new Nightduty({
      data: imageData,
      contentType: req.file.mimetype,
      size: fileSize,
    });
    await nightduty.save();
    res.render('nightduty', { message: '안전당직표가 게시되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).send('안전당직표를 업데이트하지 못했습니다.');
  }
};


//탈모
const hat = asyncHandler(async(req, res) => {
  const newStatus = req.body.status;
  try {
      await Hat.updateOne({}, { status: newStatus });
      res.redirect('/admin');
  } catch (err) {
      console.error(err);
      res.status(500).send('Failed to update status');
  }
})



module.exports = {
  getfood,
  uploadFood,
  getdayduty,
  uploadDayduty,
  getnightduty,
  uploadNightduty,
  getadmin,
  hat,
};