const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  let token = req.headers.token;

  try {
    let user = await jwt.verify(token, process.env.SECRET);
    console.log("USER: ", user); //

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      errors: "Invalid Token",
    });
  }
};
