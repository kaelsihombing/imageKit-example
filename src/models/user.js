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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

class User extends mongoose.model("User", userSchema) {
  static async register(req) {
    let params = {
      name: req.body.name,
    };

    if (req.file) {
      let image = await imageKit.upload({
        file: req.file.buffer.toString("base64"),
        fileName: `IMG-${Date.now()}`,
      });

      let url = imageKit.url({
        src: image.url,
        transformation: [
          {
            height: "300",
            width: "400",
          },
        ],
      });

      params.image = url;
    }

    return new Promise((resolve, rejects) => {
      this.create(params).then((data) => {
        return resolve({
          success: true,
          data: data,
        });
      });
    });
  }
}

module.exports = User;
