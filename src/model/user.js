import mongoose from "mongoose";

const userModal = new mongoose.Schema({
  fullname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  accountType: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  resetPasswordExpires: {
    type: String
  },
  lastActionDate: Date,
  streakCount: {
    type: Number,
    default: 0
  },
  badges: {
    type: Array,
    default: []
  },
  coins: {
    type: Number,
    default: 0
  },
  profilePic: {
    type: String
  },
  course: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }],
  notes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject"
  }],
  quantums: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quantum"
  }],

})


export const User = mongoose?.models?.User || mongoose.model("User", userModal)