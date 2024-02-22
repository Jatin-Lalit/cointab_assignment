const express = require("express");
const { User } = require("../models");

const userRouter = express.Router();

userRouter.post("/add/user", async (req, res) => {
  try {
    // Checking user with the same email exists or not
    const existingUser = await User.findOne({
      where: { user_id: req.body.user_id },
    });

    if (existingUser) {
      return res
        .status(409)
        .send({ success: "false", message: "User already exists" });
    } else {
      const newUser = await User.create(req.body);
      return res
        .status(201)
        .send({ success: "true", message: "User added successfully", newUser });
    }
  } catch (error) {
    console.error("Error adding user:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = {
  userRouter,
};
