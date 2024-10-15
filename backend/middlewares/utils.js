import jwt from "jsonwebtoken";
import { SECRET } from "../config/index.js";

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token || req.params.invitationCode;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const user = await jwt.verify(token, SECRET);
    req.userId = user.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export { verifyToken };
