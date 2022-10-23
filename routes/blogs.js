import express from "express";

import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  getBlogsByUser,
  updateBlog,
} from "../controllers/blog.js";
import auth from "../middleware/auth.js";
const router = express.Router();
router.post("/", auth, createBlog);
router.get("/", getBlogs);
router.get("/:id", getBlog);
router.delete("/:id", auth, deleteBlog);
router.patch("/:id", auth, updateBlog);
router.get("/userblogs/:id", auth, getBlogsByUser);

export default router;
