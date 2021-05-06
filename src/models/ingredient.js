const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const ingredientSchema = new Schema(
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

ingredientSchema.plugin(mongoosePaginate);

class Ingredient extends mongoose.model("Ingredient", ingredientSchema) {
  static addIngredient(req) {
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

  static getAll(req) {
    let options = {
      page: req.query.page,
      limit: 5,
      pagination: true,
      sort: "-updatedAt",
    };

    return new Promise((resolve, rejects) => {
      this.find({})
        .then((data) => {
          this.paginate({}, options).then((data) => {
            return resolve({
              success: true,
              data: data,
            });
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

module.exports = Ingredient;
