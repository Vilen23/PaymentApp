const express = require("express");
const { validSignup, updateInfo } = require("../validation/Signup");
const { User, Account } = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const bcrypt = require("bcrypt");
const { authMiddleware } = require("../middleware/middleware");

router.post("/signup", async (req, res) => {
  const { success } = validSignup.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    Username: req.body.Username,
  });
  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken/Incorrect inputs",
    });
  }
  console.log("hi3");
  const hashedpass = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({
    Username: req.body.Username,
    Firstname: req.body.Firstname,
    Lastname: req.body.Lastname,
    password: hashedpass,
  });
  const userId = user._id;

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    message: "User created successfully",
    token: token,
  });

});

router.post("/signin", async (req, res) => {
  const username = req.body.Username;
  const password = req.body.password;
  const user = await User.findOne({ Username: username });
  if (!user) {
    res.status(411).json({
      msg: "Invalid Username",
    });
  } else {
    const checkpassword = await bcrypt.compare(password, user.password);
    if (checkpassword) {
      const token = jwt.sign(
        {
          userId: user._id,
        },
        JWT_SECRET
      );
      res.status(200).json({
        msg: "User logged in successfully",
        token: token,
      });
    } else {
      res.status(411).json({
        msg: "Wtf is going on",
      });
    }
  }
});

router.put("/", authMiddleware, async (req, res) => {
  const valid = updateInfo.safeParse(req.body);
  if (!valid.success) {
    res.status(403).json({
      msg: "Error while updating information",
    });
    return;
  }
  await User.updateOne(req.body, {
    _id: req.userId,
  });
  res.status(200).json({
    msg: "Updated successfully",
  });
});

router.get("/bulk", async (req, res) => {
  try {
    const filter = req.query.filter; // Use req.query to get query parameters
    const users = await User.find({
      $or: [
        {
          Username: {
            $regex: filter,
          },
        },
        {
          Firstname: {
            $regex: filter,
          },
        },
      ],
    }).exec();

    res.json({
      users: users.map((user) => ({
        Username: user.Username,
        Firstname: user.Firstname,
        Lastname: user.Lastname,
        _id: user._id,
      })),
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router

module.exports = router;
