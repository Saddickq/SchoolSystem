import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { SECRET } from "../config/index.js";
import sendInvitationEmail from "../helpers/index.js";
import User from "../models/users.model.js";

class UserController {
  static async profile(req, res) {
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(404).json({ message: "No user was found" });
      }
      const user = await User.findById(userId);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong " });
    }
  }

  static async inviteUser(req, res) {
    try {
      const { email, role } = req.body;
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(400).json({ message: "User already exist" });
      }
      const defaultPassword = Math.random().toString(36).slice(-8);
      const user = await new User({
        email,
        role,
        password: defaultPassword,
        isActive: false,
      });
      await user.save();
      const token = jwt.sign({ userId: user._id, email: user.email }, SECRET, {
        expiresIn: "24h",
      });

      const invitationLink = `http://localhost:5173/activate-account/${token}`;
      await sendInvitationEmail(user.email, invitationLink);
      return res
        .status(200)
        .json({ message: "Invitation sent successfully", user });
    } catch (error) {
      //   console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  static async activateAccount(req, res) {
    const { password } = req.body;
    try {
      const userId = req.userId;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "No user was found" });
      }
      user.password = password;
      user.isActive = true;
      await user.save();

      const token = jwt.sign({userId: user._id}, SECRET, { expiresIn: "9h" });

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 9 * 60 * 60 * 1000,
      });

      return res
        .status(200)
        .json({ message: "Account activated successfully", user });
    } catch (error) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
  }
}

export default UserController;
