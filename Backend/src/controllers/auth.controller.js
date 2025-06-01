import { upStreamUser } from "../lib/stream.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
export async function signup(req, res) {
  /// extracting all the field from the body
  const { email, password, fullName } = req.body;

  try {
    /// Searching of all the fields
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "All fields are required" });
    }
    /// checking the length of password
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    /// checking wheather email is in correct format or not
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User Already exists, please user  differnet one " });
    }
    // Create a new user with the provided details and avatar
    const newUser = await User.create({
      email,
      fullName,
      password,
      profilePic: randomAvatar,
    });

    /// Stream User signup
    try {
      await upStreamUser({
        id: newUser._id.toString(),
        name: newUser.fullName,
        image: newUser.profilePic || "",
      });
      console.log(`Stream user created for ${newUser.fullName}`);
    } catch (error) {
      console.log("Error creating Stream user:", error);
    }

    // The token is created in this line:

    // Purpose:
    // This line generates a JSON Web Token (JWT) after a new user registers. The token contains the user's ID and is signed with a secret key.

    // Why create the token?

    // Authentication: The token is used to identify and authenticate the user in future requests without requiring them to log in again.
    // Session Management: By sending the token as a cookie, the server can recognize the user on subsequent requests.
    // Security: The token is signed, so it can't be tampered with by the client.
    // How it works:

    // When the user registers, the server creates a JWT containing their user ID.
    // The token is sent to the client (browser) as a cookie.
    // On future requests, the client sends the token back, allowing the server to verify the user's identity.
    // Gotcha:
    // Make sure your JWT_SECRET_KEY is strong and kept private, or anyone could forge tokens.

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    ///////This code sets a cookie named "jwt" in the user's browser to store a
    // JSON Web Token (JWT) for authentication.
    // The options help secure the cookie by making it HTTP-only,
    // restricting cross-site access, and ensuring it's only sent over HTTPS in production.
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    /// this is the response to check wheather user is created or not

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.log("Error in signup controller ");
    res.status(500).json({ message: "Server error" });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password " });
    }

    const isPasswordcorrect = await user.matchPassword(password);
    if (!isPasswordcorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(201).json({ success: true, user });
  } catch (error) {
    console.log("Error in Login controller ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export function logout(req, res) {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logout Successfully" });
}
