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
  role: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  resetPasswordExpires: {
    type: String
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
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }],
  notes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject"
  }],
  quizz: [{
    type:String
  }],
  quizzAns: {
    type:Number
  }
 

})


export const User = mongoose?.models?.User || mongoose.model("User", userModal)