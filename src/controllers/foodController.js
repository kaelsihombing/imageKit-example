const Food = require("../models/food");

exports.addFood = async (req, res) => {
  try {
    let result = await Food.addFood(req);
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
    let result = await Food.getAll(req.query.like);
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
