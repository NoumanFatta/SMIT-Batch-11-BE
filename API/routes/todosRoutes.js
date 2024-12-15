const express = require("express");
const router = express.Router();
const { getFileData, addFileData, appendFileData } = require("../utils/helper");
const { ENUMS } = require("../utils/vars");
const { v4: uuidv4 } = require("uuid");

router.get("/", (req, res) => {
  const data = getFileData(ENUMS.todoFile);
  const userTodos = data.data.filter((d) => d.createdBy === req.user.id);
  res.json({ data: userTodos });
});

router.post("/", (req, res) => {
  const data = {
    ...req.body,
    id: uuidv4(),
    createdBy: req.user.id,
  };
  appendFileData(ENUMS.todoFile, data);
  res.json({ message: "Todo has been created", data });
});

router.get("/:id", (req, res) => {
  const data = getFileData(ENUMS.todoFile);
  const foundTodo = data.data.find(
    (t) => t.id === req.params.id && t.createdBy === req.user.id
  );
  if (!foundTodo) {
    return res.status(404).json({ message: "Todo not found!" });
  }
  res.json({ message: "Todo has been fetched", data: foundTodo });
});

const todosRoutes = router;
module.exports = todosRoutes;
