import User from "../models/users.model.js";
import bcrypt from "bcrypt";

class UserController {
  static async registerUser(req, res) {
    // Get user details from req.body
    const { email, name, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        error: "Name, role, email and password are required",
      });
    }

    // check for existing users with same credentials
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: `${existingUser.email} is already taken`,
      });
    }
    try {
      const salt = await bcrypt.genSalt(10);
      const hash_password = await bcrypt.hash(password, salt);
      const user = new User({ name, email, password: hash_password, role });
      await user.save();
      return res.status(200).json({
        message: "Successfully signed up",
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message
      });
    }
  }
}

export default UserController;