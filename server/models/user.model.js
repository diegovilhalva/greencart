import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: function () {
      return !this.googleId;
    },
  },

  googleId: {
    type: String,
    default: null,
  },

  avatar: {
    type: String,
    default: "", 
  },

  cartItems: {
    type: Object,
    default: {},
  },

 
}, { timestamps: true, minimize: false });

const User = mongoose.model("User", userSchema);

export default User;
