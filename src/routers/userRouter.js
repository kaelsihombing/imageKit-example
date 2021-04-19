const router = require("express").Router();
const multer = require("../middlewares/multer");
const userController = require("../controllers/userController");

router.post("/user", multer, userController.registerUser);

module.exports = router;
