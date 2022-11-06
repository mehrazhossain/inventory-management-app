const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'images/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const uploader = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const supportImage = /png|jpg/;
    const extension = path.extname(file.originalname);

    if (supportImage.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error('Must be a png/jpg image'));
    }
  },
  limits: {
    fileSize: 5000000,
  },
});

module.exports = uploader;
