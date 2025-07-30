import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";
const TOKEN_EXPIRES = "24h";

const createToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES });
};

// Register Funtion
export async function registerUser(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email format" });
  }
  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters long",
    });
  }

  try {
    if (await User.findOne({ email })) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered",
      });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashed,
    });
    const token = createToken(user._id);
    return res.status(201).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

//login function

export async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = createToken(user._id);
    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
