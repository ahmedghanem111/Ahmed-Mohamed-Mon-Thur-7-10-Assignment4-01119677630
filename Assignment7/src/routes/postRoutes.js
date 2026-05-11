import { Router } from "express";
import { Sequelize } from "sequelize";

const postRouter = Router();
const { Post, userModel, Comment } = await import("../DB/models/modelsRelations.js");

//Create Post
postRouter.post("/", async (req, res) => {
  try {
    const post = new Post(req.body);

    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

//Delete Post By Owner
postRouter.delete("/:postId", async (req, res) => {
  try {
    const { userId } = req.body;

    const post = await Post.findByPk(req.params.postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (post.userId != userId) {
      return res.status(403).json({
        message: "Not Allowed",
      });
    }

    await post.destroy();

    res.json({
      message: "Post deleted",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

//Posts Details
postRouter.get("/details", async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: ["id", "title"],

      include: [
        {
          model: userModel,
          attributes: ["id", "name"],
        },

        {
          model: Comment,
          attributes: ["id", "content"],
        },
      ],
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

//Posts With Comments Count
postRouter.get("/comment-count", async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: [
        "id",
        "title",

        [
          Sequelize.fn("COUNT", Sequelize.col("Comments.id")),
          "commentsCount",
        ],
      ],

      include: [
        {
          model: Comment,
          attributes: [],
        },
      ],

      group: ["Post.id"],
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

export default postRouter;