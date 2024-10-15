import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";


const userSchema = Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
      minlength: [6, "Password must be 6 characters or more long"],
    },
    role: {
      type: String,
      required: true,
      default: "admin",
      enum: ["admin","lecturer", "student"],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const user = model("Users", userSchema);

export default user;
