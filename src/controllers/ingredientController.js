const Ingredient = require("../models/ingredient");

exports.addIngredient = async (req, res) => {
  try {
    let result = await Ingredient.addIngredient(req);
    if (result.success === true) {
      return res.status(201).json({
        success: true,
        data: result.data,
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      data: err.message,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    let result = await Ingredient.getAll(req);
    if (result.success === true) {
      return res.status(201).json({
        success: true,
        data: result.data,
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      data: err.message,
    });
  }
};
