const multer = require("multer");
const image = multer().single("image");

module.exports = image;
