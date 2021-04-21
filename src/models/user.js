const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const imageKit = require("../helpers/imagekit");

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    favoriteFoods: [
      {
        type: Schema.Types.ObjectId,
        ref: "Food",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// userSchema.plugin(mongoosePaginate);

class User extends mongoose.model("User", userSchema) {
  static async register(req) {
    let params = {
      name: req.body.name,
    };

    params.favoriteFoods = req.body.foods.map((food) => {
      return food;
    });

    // if (req.file) {
    //   let image = await imageKit.upload({
    //     file: req.file.buffer.toString("base64"),
    //     fileName: `IMG-${Date.now()}`,
    //   });

    //   let url = imageKit.url({
    //     src: image.url,
    //     transformation: [
    //       {
    //         height: "300",
    //         width: "400",
    //       },
    //     ],
    //   });

    //   params.image = url;
    // }

    return new Promise((resolve, rejects) => {
      this.create(params).then((data) => {
        return resolve({
          success: true,
          data: data,
        });
      });
    });
  }

  static getAll() {
    return new Promise((resolve, rejects) => {
      this.find({})
        .populate({
          path: "favoriteFoods",
          // select: "name",
          options: { sort: { createdAt: -1 } },
        })
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

module.exports = User;
