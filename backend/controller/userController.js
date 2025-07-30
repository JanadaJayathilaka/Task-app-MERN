import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
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
