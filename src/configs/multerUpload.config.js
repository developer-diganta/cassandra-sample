const multer = require("multer");
const storage = require("./multer.config");
const checkFileType = require("../utils/checkFileType.utils");

const upload = multer({
    storage: storage,
}).single('image');

module.exports = upload;