import express from 'express';
import { TestConnection } from './DB/connection.js';
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

import { userModel } from './DB/models/user.model.js';
import Post from './DB/models/post.model.js';
import Comment from './DB/models/comment.model.js';

export const bootstrap = async () => {
await TestConnection();
const app = express();

await userModel.sync({
    alter: false
});
await Post.sync({
    alter: false
});
await Comment.sync({
    alter: false
});

app.use(express.json());
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);


app.listen(3000, () => {
  console.log(`Server is running on port 3000 `);
});

}