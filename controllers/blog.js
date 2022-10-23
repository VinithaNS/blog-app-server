import mongoose from "mongoose";

import BlogModal from "../models/blog.js";

export const createBlog = async (req, res) => {
  const blog = req.body;
  const newBlog = new BlogModal({
    ...blog,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await BlogModal.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await BlogModal.findById(id);
    res.status(200).json(blog);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getBlogsByUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "User doesn't exist" });
  }
  const userblogs = await BlogModal.find({ creator: id });
  res.status(200).json(userblogs);
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No blog exist with id: ${id}` });
    }
    await BlogModal.findByIdAndRemove(id);
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, description, creator, imageFile, tags } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No blog exist with id: ${id}` });
    }

    const updatedBlog = {
      creator,
      title,
      description,
      tags,
      imageFile,
      _id: id,
    };
    await BlogModal.findByIdAndUpdate(id, updatedBlog, { new: true });
    res.json(updatedBlog);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
