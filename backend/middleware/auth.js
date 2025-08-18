import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function authMiddleware(req, res, next) {
  try {
    // Grab the token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach user object to request (exclude password)
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    // Handle token verification errors specifically
    let message = "Unauthorized: Token is invalid or expired";
    if (error.name === "TokenExpiredError") message = "Token expired";
    else if (error.name === "JsonWebTokenError") message = "Token is invalid";

    console.error("JWT Error:", error.message);

    return res.status(401).json({
      success: false,
      message,
    });
  }
}
