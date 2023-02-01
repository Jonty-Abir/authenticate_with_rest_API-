const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "userName is require*"],
      unique: [true, "userName alreay exist."],
      minLength: [1, "Atleast 1 char need"],
    },
    password: {
      type: String,
      required: [true, "password is require*"],
      unique: false,
      minLength: [4, "strong password require."],
    },
    email: {
      type: String,
      required: [true, "email is require*"],
      unique: [true, "email alreay exist."],
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    mobile: {
      type: String,
    },
    avatar: {
      type: String,
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model.Users || mongoose.model("User", userSchema);
