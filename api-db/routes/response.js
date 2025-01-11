const express = require("express");
const FormModel = require("../models/form.model");
const { isValidObjectId } = require("mongoose");
const ResponseModel = require("../models/response.model");
const router = express.Router();

const responseRoutes = router;

router.post("/", async (req, res) => {
  try {
    if (!isValidObjectId(req.body?.id)) {
      return res.status(404).json({ message: "Form not found!" });
    }
    const form = await FormModel.findOne({
      _id: req.body.id,
      createdBy: {
        $ne: req.user._id,
      },
      $or: [
        {
          isPublic: true,
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
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    const data = req.body;
    const response = new ResponseModel({
      response: data.response,
      form: form._id,
      submittedBy: req.user._id,
    });
    await response.save();
    res.json({ message: "Response has been saved" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/", async (req, res) => {
  try {
    console.log(req.user._id.toString());
    // const responses = await ResponseModel.find({}).populate({
    //   path: "form",
    //   match :{
    //     createdBy:req.user._id
    //   }
    // });

    const responses = await ResponseModel.aggregate([
      {
        $lookup: {
          from: 'forms', // The name of the 'Form' collection (make sure it's correct)
          localField: 'form', // The field in 'Response' that refers to 'Form'
          foreignField: '_id', // The '_id' field in 'Form' collection
          as: 'form' // Alias for the populated form
        }
      },
      {
        $match: { 'form.createdBy': req.user._id } // Filter only those where 'form.createdBy' matches the provided userId
      }
    ])
    res.json({ message: "Response has been fetched", data: responses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = responseRoutes;
