const express = require("express");
const TodoModel = require("../models/todo.model");
const { isValidObjectId } = require("mongoose");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const todos = await TodoModel.find({
      $or: [
        {
          isPublic: true,
        },
        {
          createdBy: req.user._id,
        },
      ],
    })
      .populate("createdBy", { email: 1 })
      .select({
        description: 0,
      });
    res.json({ message: "Todos fethched successfully", data: todos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
router.post("/", async (req, res) => {
  try {
    const data = new TodoModel({ ...req.body, createdBy: req.user._id });
    await data.save();
    res.json({ message: "Todo has been created", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: "Todo not found!" });
    }
    const todo = await TodoModel.findOne({
      createdBy: req.user._id,
      _id: req.params.id,
    })
      .populate("createdBy", { email: 1 })
      .select({
        description: 0,
      });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found!" });
    }
    res.json({ message: "Todos fethched successfully", data: todo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
router.patch("/:id", async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: "Todo not found!" });
    }
    const updatedTodo = await TodoModel.updateOne(
      {
        createdBy: req.user._id,
        _id: req.params.id,
      },
      req.body
    );
    if (!updatedTodo.matchedCount) {
      return res.status(404).json({ message: "Todo not found!" });
    }
    res.json({ message: "Todo updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: "Todo not found!" });
    }
    const updatedTodo = await TodoModel.deleteOne({
      createdBy: req.user._id,
      _id: req.params.id,
    });
    console.log(updatedTodo);
    if (!updatedTodo.deletedCount) {
      return res.status(404).json({ message: "Todo not found!" });
    }
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
const todoRoutes = router;
module.exports = todoRoutes;
