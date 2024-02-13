const path = require('path');

const checkFileType = (file) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return true;
  } else {
    throw ('Error: Images only!'); 
  }
}

module.exports = checkFileType;