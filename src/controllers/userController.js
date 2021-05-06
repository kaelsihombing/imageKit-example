const User = require("../models/user");

exports.registerUser = async (req, res) => {
  try {
    let result = await User.register(req);
    if (result.success === true) {
      return res.status(201).json({
        success: true,
        message: result.message,
        data: result.data,
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    let result = await User.getAll(req.user.role);
    if (result.success === true) {
      return res.status(201).json({
        success: true,
        data: result.data,
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
