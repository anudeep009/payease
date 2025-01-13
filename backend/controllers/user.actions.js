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

export { searchUser }