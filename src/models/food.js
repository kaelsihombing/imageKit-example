const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema(
  {
    name: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

class Food extends mongoose.model("Food", foodSchema) {
  static addFood(req) {
    let params = {
      name: req.body.name,
    };
    return new Promise((resolve, rejects) => {
      this.create(params)
        .then((data) => {
          return resolve({
            success: true,
            data: data,
          });
        })
        .catch((error) => {
          return rejects({
            success: false,
            error: error,
          });
        });
    });
  }

  static getAll() {
    return new Promise((resolve, rejects) => {
      this.find({})
        .then((data) => {
          return resolve({
            success: true,
            data: data,
          });
        })
        .catch((error) => {
          return rejects({
            success: false,
            error: error,
          });
        });
    });
  }
}

module.exports = Food;
