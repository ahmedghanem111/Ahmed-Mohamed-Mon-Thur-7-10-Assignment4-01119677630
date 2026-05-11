import { Router } from "express";
import { Sequelize } from "sequelize";

const commentRouter = Router();
const { Comment , userModel, Post } = await import("../DB/models/modelsRelations.js");


//Create Comment
commentRouter.post("/", async (req, res) => {
  try {
    const comments = await Comment.bulkCreate(req.body);

    res.status(201).json(comments);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

//update Comment
commentRouter.patch("/:commentId", async (req, res) => {
  try {
    const { userId, content } = req.body;

    const comment = await Comment.findByPk(req.params.commentId);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    if (comment.userId != userId) {
      return res.status(403).json({
        message: "Not Allowed",
      });
    }

    comment.content = content;

    await comment.save();

    res.json(comment);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});  

//Find Or Create
commentRouter.post("/find-or-create", async (req, res) => {
  try {
    const { postId, userId, content } = req.body;

    const [comment, created] = await Comment.findOrCreate({
      where: {
        postId,
        userId,
        content,
      },

      defaults: {
        postId,
        userId,
        content,
      },
    });

    res.json({
      created,
      comment,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

//Search Comment
commentRouter.get("/search", async (req, res) => {
  try {
    const word = req.query.word;

    const result = await Comment.findAndCountAll({
      where: {
        content: {
          [Op.like]: `%${word}%`,
        },
      },
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

//Newest 3 Comments
commentRouter.get("/newest/:postId", async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: {
        postId: req.params.postId,
      },

      order: [["createdAt", "DESC"]],

      limit: 3,
    });

    res.json(comments);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

//Comment Details
commentRouter.get("/details/:id", async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },

        {
          model: Post,
        },
      ],
    });

    res.json(comment);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

export default commentRouter;