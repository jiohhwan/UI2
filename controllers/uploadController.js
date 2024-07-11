const Image = require('../models/imgModel');

const uploadImage = async (req, res) => {
  try {
    const newImage = new Image({
      filename: req.file.filename,
      path: req.file.path,
      contentType: req.file.mimetype,
      size: req.file.size,
    });

    await newImage.save();
    res.send('이미지가 저장되었습니다.');
  } catch (error) {
    console.error(error);
    res.status(500).send('에러 발생.');
  }
};

module.exports = {
    uploadImage,
}