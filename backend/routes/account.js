const express = require("express");
const { authMiddleware } = require("../middleware/middleware");
const { Account } = require("../db");
const router = express.Router();
const mongoose = require('mongoose')

router.get("/balance", authMiddleware, async (req, res) => {
  const userid = req.userId;
  const response = await Account.findOne({ userId: userid });
  if (response) {
    res.status(200).json({
      balance: response.balance,
    });
  } else {
    res.status(300).json({
      msg: "Account not found",
    });
  }
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    res.status(400).json({
      msg: "Insuccient balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    res.status(400).json({
      msg: "Account not found",
    });
  }

  //Perform the transaction 
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  );

  //Commit the transaction
  await session.commitTransaction();
  res.json({
    msg:"Transfer successfully"
  })
});

module.exports = router;
