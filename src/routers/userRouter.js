const router = require("express").Router();
const multer = require("../middlewares/multer");
const userController = require("../controllers/userController");
const authenticate = require("../middlewares/authenticate");

router.post("/users", multer, userController.registerUser);
router.get("/users", authenticate, userController.getAll);

module.exports = router;
