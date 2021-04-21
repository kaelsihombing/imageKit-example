const router = require("express").Router();
const ingredientController = require("../controllers/ingredientController");

router.post("/ingredients", ingredientController.addIngredient);
router.get("/ingredients", ingredientController.getAll);

module.exports = router;
