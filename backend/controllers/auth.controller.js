import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const signUp = async (req, res) => {
  const { username, password, firstname, lastname } = req.body;

  if (!username || !password || !firstname || !lastname) {
    return res
      .status(400)
      .send({ message: "Please provide all required credentials" });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .send({ message: "User already exists, please log in" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      firstname,
      lastname,
    });

    return res.status(201).send({ message: "User signed up successfully" });
  } catch (error) {
    console.error("Error during sign up:", error);
    return res
      .status(500)
      .send({ message: "Error during sign up", error: error.message });
  }
};

const signIn = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ message: "Please provide username and password" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found. Please sign up." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1D",
    });

    return res.status(200).send({
      message: "User logged in successfully",
      token,
      username: user.username,
      userid: user._id,
    });
  } catch (error) {
    console.error("Error during sign in:", error);
    return res
      .status(500)
      .send({ message: "Error during sign in", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { username } = req.params;
    const { firstname, lastname, password } = req.body;

    if (!firstname && !lastname && !password) {
      return res.status(400).json({ message: "No fields to update provided." });
    }

    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    let updateData = {};
    if (firstname) updateData.firstname = firstname; 
    if (lastname) updateData.lastname = lastname;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    await User.updateOne({ username: username }, { $set: updateData });

    const updatedUser = await User.findOne({ username: username }).select(
      "-password"
    );

    res.status(200).json({
      message: "User information updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
};


export { signUp, signIn, updateUser };