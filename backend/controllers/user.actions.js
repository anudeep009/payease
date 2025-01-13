import User from "../models/user.model.js";

const searchUser = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Query not provided." });
    }

    const result = await User.find({
      $or: [
        { firstname: { $regex: query, $options: "i" } },
        { lastname: { $regex: query, $options: "i" } },
      ],
    });

    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "No users found matching the query." });
    }

    return res.status(200).json({
      message: "User information found successfully.",
      users: result.map(({ username, firstname, lastname, _id }) => ({
        username,
        firstname,
        lastname,
        id: _id,
      })),
    });
  } catch (error) {
    console.error("Error during user search:", error);
    return res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
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

export { searchUser, updateUser }