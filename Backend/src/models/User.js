import mongoose from "mongoose";
import bcrypt from "bcrypt";

////////////////////  UserSchema  ///////////////////////////
const userSchema = new mongoose.Schema(
  {
    fullName: {
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
      required: true,
      minLength: 6,
    },
    bio: {
      type: String,
      default: "",
    },
    profilePic: {
      type: String,
      default: "",
    },
    nativeLanguage: {
      type: String,
      default: "",
    },
    learningLanguage: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    isOnboarded: {
      type: Boolean,
      default: false,
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

////////////////  Hashing  ////////////////////////////
userSchema.pre("save", async function (next) {
  /// One of the optimization //////////
  if (!this.isModified("password")) return next();
  /// 12355 ==  46sdfu6bgiuvc647d_=cuv  { Will enctrpt it }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});
const User = mongoose.model("User", userSchema);

export default User;
