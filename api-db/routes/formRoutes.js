const express = require("express");
const TodoModel = require("../models/todo.model");
const FormModel = require("../models/form.model");
const router = express.Router();

const formRoutes = router;

router.post("/", async (req, res) => {
  try {
    const data = new FormModel({ ...req.body, createdBy: req.user._id });
    await data.save();
    res.json({ message: "Form has been created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await FormModel.findOne({
      _id: req.params.id,
      $or: [
        {
          isPublic: true,
        },
        {
          createdBy: req.user._id,
        },
        {
          visible: {
            $elemMatch: {
              $eq: req.user._id,
            },
          },
        },
      ],
    });
    if (!data) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.json({ message: "Form has been fethced", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});

module.exports = formRoutes;
