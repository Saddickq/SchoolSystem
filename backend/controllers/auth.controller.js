import User from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/index.js";

class Auth {
  static async signIn(req, res) {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                error: "user not found please sign up",
            });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign({ _id: user._id }, SECRET, { expiresIn: "6h" });
        res.cookie("token", token, { httpOnly: true, maxAge: 9999 });

        return res.status(200).json({
          token,
          user: {
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
      }
      return res.status(401).json({
        error: "Incorrect password",
      });
    } catch (error) {
      return res.status(401).json({
        error: "Error signing in. Try again.",
      });
    }
  }
}

export default Auth;
