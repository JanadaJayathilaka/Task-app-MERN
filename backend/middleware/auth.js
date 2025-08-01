import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";

export default async function authMiddleware(req, res, next) {
  //GRAB the BEARER token from authorization header
  const authHeader = req.headers.authorization;
}
