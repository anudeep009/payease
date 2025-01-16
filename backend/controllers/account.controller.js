import Account from "../models/account.model.js";
import mongoose from "mongoose";

const getBalance = async (req, res) => {
  try {
    const userid = req.user.userId;

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

const transfer = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    const { toUserId, amount } = req.body;
    
    if (amount <= 0) {
      return res.status(400).json({ message: "Invalid transfer amount" });
    }

    session.startTransaction();

    const account = await Account.findOne({ userid: req.user.userId }).session(
      session
    );
    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient balance" });
    }
    const toAccount = await Account.findOne({
      userid: new mongoose.Types.ObjectId(toUserId),
    }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid To account" });
    }

    await Account.updateOne(
      { userid: req.user.userId },
      { $inc: { balance: -amount } }
    ).session(session);

    await Account.updateOne(
      { userid: toUserId },
      { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();
    return res.status(200).json({ message: "Transfer Successful" });
  } catch (error) {
    await session.abortTransaction();
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error during Transfer", error: error.message });
  } finally {
    session.endSession();
  }
};


export { getBalance, transfer };