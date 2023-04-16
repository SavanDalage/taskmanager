const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("../models/tasks");

//////////////////////

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true, // stworzy autoamtycznie indeks i będzie pilnował by e-maile się nie powtarzały
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("E-mail is invalide.");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [7, "Password is too short."],
      trim: true,
      validate(value) {
        const val = value.toLowerCase();
        if (val.includes("password")) {
          throw new Error(`Password can not contain "password"`);
        }
      },
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error("Age must be a positive number.");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

//////////////////////  MIDDLEWARE

userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

userSchema.methods.genereteAuthToken = async function () {
  const user = this;

  // const token = jwt.sign({ _id: user._id.toString() }, "thisismynewtoken");
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.TOKEN_SECRET
  );

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

// Login scheme
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  // console.log("Just before saving");

  next(0);
});

//////////////////////
/* // powinno działać z remove(), ale nie działa i trzeba kasować z wnętrza kasowania profilu
userSchema.pre("remove", async function (next) {
  const user = this;
  Task.deleteMany({ owner: user._id });
  next();
});
*/
const User = mongoose.model("User", userSchema);

module.exports = User;
