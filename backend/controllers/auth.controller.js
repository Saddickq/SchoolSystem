import User from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/index.js";

class AuthController {
  static async register(req, res) {
    try {
      const { email, password, firstName, lastName } = req.body;
      const userExist = await User.findOne({ email: email });
      if (userExist) {
        return res.json({ message: "Email is already taken" });
      }
      const user = await new User({
        email: email,
        password: password,
        firstName,
        lastName,
      });
      const newUser = await user.save();
      if (newUser) {
        return res
          .status(201)
          .json({ newUser, message: "Your account has being created" });
      }
      return res
        .status(500)
        .json({ message: "User not registered successfully" });
    } catch (error) {
      return res.json({ message: error.message }).status(500);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(404)
          .json({ message: "No user with these credientials" });
      }
      const verified = await bcrypt.compare(password, user.password);
      if (verified) {
        const payload = {
          userId: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        };
        const token = jwt.sign(payload, SECRET, { expiresIn: "9h" });

        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 9 * 60 * 60 * 1000,
        });

        return res.status(200).json({ user });
      }

      return res
        .status(401)
        .json({ message: "Incorrect Password. Try Again!" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong, please try again later" });
    }
  }
    static async logout(req, res) {
      res
        .cookie("token", "", {
          httpOnly: true,
          secure: true,
          maxAge: 1,
        })
        .status(200)
        .json({ message: "You're logged out successfully" });
    }
}

export default AuthController;
