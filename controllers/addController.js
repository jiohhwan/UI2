const asyncHandler = require('express-async-handler');
const XLSX = require('xlsx');

const Food = require('../models/foodModel');
const Dayduty = require('../models/daydutyModel');
const Nightduty = require('../models/nightdutyModel');
const Hat = require('../models/hatModel');
const Cloth = require('../models/clothModel');


//admin
const getAdmin = asyncHandler(async(req, res) => {
  const hat = await Hat.findOne({});
  res.render("admin", { hat });
});

//식단표
const getFood = (req, res) => {
  res.render("addFood", { message: null });
};

const uploadFood = asyncHandler(async(req, res) => {
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
    res.render('addFood', { message: '식단표가 게시되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).send('식단표를 업데이트하지 못했습니다.');
  }
});


//학생당직표
const getDayduty = (req, res) => {
  res.render("addDayduty", { message: null });
};

const uploadDayduty = asyncHandler(async(req, res) => {
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
    res.render('addDayduty', { message: '학생당직표가 게시되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).send('학생당직표를 업데이트하지 못했습니다.');
  }
});


//안전당직표
const getNightduty = (req, res) => {
  res.render("addNightduty", { message: null });
};

const uploadNightduty = asyncHandler(async(req, res) => {
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
    res.render('addNightduty', { message: '안전당직표가 게시되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).send('안전당직표를 업데이트하지 못했습니다.');
  }
});


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
});


//검수창고
const getCloth = asyncHandler(async(req, res) => {
  const files = await Cloth.find({}).sort({ createdAt: -1 });
  const latestFile = files[0];
  res.render("cloth", {latestFile});
});

//검창재고표
const getaddCloth = (req, res) => {
  res.render("addCloth", { message: null });
};

const uploadCloth = async(req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    const fileSize = req.file.size;
    const file = new Cloth({
      filename: req.file.originalname,
      data: req.file.buffer,
      size: fileSize,
    });
    await file.save();
    res.render('addCloth', { message: '검창재고표가 게시되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).send('검창재고표를 업데이트하지 못했습니다.');
  }
};


const downloadCloth = async(req, res) => {
  const file = await Cloth.findOne({}).sort({ createdAt: -1 });
  if (!file) {
    return res.status(404).send('No file found');
  }
  const workbook = XLSX.read(file.data, { type: 'buffer' });
  const fileBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  res.set({
    'Content-Disposition': `attachment; filename="${file.filename}"`,
    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  res.send(fileBuffer);
}

module.exports = {
  getFood,
  uploadFood,
  getDayduty,
  uploadDayduty,
  getNightduty,
  uploadNightduty,
  getAdmin,
  hat,
  getCloth,
  getaddCloth,
  uploadCloth,
  downloadCloth
};