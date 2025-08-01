import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";

export default async function authMiddleware(req, res, next) {
  //GRAB the BEARER token from authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized. Token missing" });
  }

  const token = authHeader.split(" ")[1];

  //Verify and attach user object
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized. Invalid token" });
  }
}
