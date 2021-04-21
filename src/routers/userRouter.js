const router = require("express").Router();
const multer = require("../middlewares/multer");
const userController = require("../controllers/userController");

router.post("/users", multer, userController.registerUser);
router.get("/users", userController.getAll);

module.exports = router;
