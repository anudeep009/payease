import Account from "../models/account.model.js";
import mongoose from "mongoose";

const getBalance = async (req, res) => {
  try {
    const { userid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userid)) {
      return res.status(400).json({ message: "Invalid userid format" });
    }

    if (!userid) {
      return res.status(400).json({ message: "userid is required" });
    }

    const account = await Account.findOne({ userid });
    if (!account) {
      return res
        .status(404)
        .json({ message: "Account not found by the given id" });
    }

    return res
      .status(200)
      .json({
        message: "Balance retrieved successfully",
        balance: account.balance,
      });
  } catch (error) {
    console.error("Error during querying balance:", error);
    return res
      .status(500)
      .json({ message: "Error during querying balance", error: error.message });
  }
};

export { getBalance };