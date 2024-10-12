import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const adminSchema = Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Provide a unique email address"],
      match: /.+\@.+\..+/
    },
    password: {
      type: String,
      minlength: [6, "Password must be 6 characters or more long"],
      required: [true, "Password is Required"],
    },
    firstName: {
      type: String,
      required: [true, "Provide your First Name"],
    },
    lastName: {
      type: String,
      required: [true, "Provide your Last Name"],
    },
    role: {
      type: String,
      required: true,
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

adminSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const admin = model("Admins", adminSchema);

export default admin;
