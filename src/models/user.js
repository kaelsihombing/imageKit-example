const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const imageKit = require("../helpers/imagekit");
const jwt = require("jsonwebtoken");

const transporter = require("../helpers/mailer");

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
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
      email: req.body.email,
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
        let token = jwt.sign(
          {
            id: data._id,
            role: data.role,
          },
          process.env.SECRET
        );
        // console.log("DATA : ", data);
        const mailOptions = {
          to: data.email,
          from: process.env.FROM_EMAIL,
          subject: "THIS IS TESTING EMAIL",
          text: `Hello ${data.name}, Welcome to Testing Email`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) throw err;
          console.log("Email sent: " + info.response);
        });

        data.token = token;
        return resolve({
          success: true,
          message: `A verify email has been sent to ${data.email}`,
          data: {
            ...data,
            token,
          },
        });
      });
    });
  }

  static getAll(role) {
    return new Promise((resolve, rejects) => {
      if (role != "ADMIN") {
        return rejects({
          success: false,
          message: "You are not Authorized for this request",
        });
      }

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
