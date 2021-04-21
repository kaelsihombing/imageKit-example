const router = require("express").Router();
const foodController = require("../controllers/foodController");

router.post("/foods", foodController.addFood);
router.get("/foods", foodController.getAll);

module.exports = router;
