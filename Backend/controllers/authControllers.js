import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function signup(req, res) {
  const { userID, password, role } = req.body;

  try {
    if (!userID || !password) {
      return res
        .status(400)
        .json({ message: "UserID and password are required" });
    }

    //add enum walu for role in req.body

    const existingUser = await User.findOne({ userID });
    if (existingUser) {
      return res.status(400).json({ message: "UserID already exists" });
    }

    const newUser = await User.create({ userID, password, role });
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    //we're using userID and role in payload so that we can identify user and his role from token
    const token = jwt.sign(
      { userID: newUser.userID, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res
      .status(201)
      .json({
        message: "User registered successfully",
        user: { userID: newUser.userID, role: newUser.role },
        token,
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
  //signup endpoint
}

export async function login(req, res) {
  try {
    console.log("Login endpoint hit");
    const { userID, password } = req.body;
    console.log("Request body:", req.body);

    if (!userID || !password) {
      console.log("Missing userID or password");
      return res
        .status(400)
        .json({ message: "UserID and password are required" });
    }

    const user = await User.findOne({ userID });
    console.log("User found:", user);

    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: "Invalid UserID or password" });
    }

    const isPasswordCorrect = await user.matchPassword(password);
    console.log("Password correct:", isPasswordCorrect);

    if (!isPasswordCorrect) {
      console.log("Incorrect password");
      return res.status(400).json({ message: "Invalid UserID or password" });
    }

    //we're using userID and role in payload so that we can identify user and his role from token
    const token = jwt.sign(
      { userID: user.userID, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    console.log("Login successful");
    res
      .status(200)
      .json({
        message: "Login successful",
        user: { userID: user.userID, role: user.role },
        token,
      });
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }

  //login endpoint
}

export async function logout(req, res) {
   //logout endpoint

   res.clearCookie("jwt");
   res.status(200).json({ message: "Logout successful" });
}
