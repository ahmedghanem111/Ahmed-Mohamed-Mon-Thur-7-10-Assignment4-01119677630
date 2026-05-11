import express from "express"
import { Router } from "express";

const userRouter = Router();
const { User } = await import("../DB/models/modelsRelations.js");

//Signup
userRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const checkEmail = await User.findOne({
      where: { email },
    });

    if (checkEmail) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const user = User.build({
      name,
      email,
      password,
      role,
    });

    await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
}
);

//Create Or Update User
userRouter.put("/:id", async (req, res) => {
  try {
    const [user, created] = await User.upsert(
      {
        id: req.params.id,
        ...req.body,
      },
      {
        validate: false,
      }
    );

    res.json({
      message: created ? "Created" : "Updated",
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
})

//Find User By Email
userRouter.put("/:id", async (req, res) => {
  try {
    const [user, created] = await User.upsert(
      {
        id: req.params.id,
        ...req.body,
      },
      {
        validate: false,
      }
    );

    res.json({
      message: created ? "Created" : "Updated",
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

//Get User By PK Without Role
userRouter.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: {
        exclude: ["role"],
      },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

export default userRouter;