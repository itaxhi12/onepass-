const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const userPreferenceSchema = new mongoose.Schema(
  {
    length: {
      type: Number,
      required: true,
    },
    isUpper: {
      type: Boolean,
      required: true,
    },
    isLower: {
      type: Boolean,
      required: true,
    },
    isNumber: {
      type: Boolean,
      required: true,
    },
    isSpecial: {
      type: Boolean,
      required: true,
    },
    generalChar: {
      type: Boolean,
      required: true,
    },
    specialChar: {
      type: Boolean,
      required: true,
    },
    parenthesis: {
      type: Boolean,
      required: true,
    },
    exclusion: {
      type: String,
      required:true
    },
  },
  {
    collection: "password preference",
  }
);

const model = mongoose.model("passpreference", userPreferenceSchema);
router.get("/preference", async (req, res) => {
  const preference = await model.findOne({}).lean();
  console.log(preference)
  res.status(200).json(preference);
});
router.post("/preference", async(req, res) => {
  const {
    length,
    isUpper,
    isLower,
    isNumber,
    isSpecial,
    generalChar,
    specialChar,
    parenthesis,
    exclusion
  } = req.body;
 const pref = await model.findOne({});

 try {
   model.findByIdAndUpdate(
     pref._id,
     {
       length:length,
       isUpper:isUpper,
       isLower:isLower,
       isNumber:isNumber,
       isSpecial:isSpecial,
       generalChar:generalChar,
       specialChar:specialChar,
       parenthesis:parenthesis,
       exclusion:exclusion,
     },
     { useFindAndModify: false },
     function (err, docs) {
       if (err) {
         console.log(err);
       }
     }
   );
   return res.status(200).json({ message: "Username Updated" });
 } catch (err) {
   console.log(err);
 }
    res.status(200).json({message:"preferences updated"})

});


module.exports = {router,model}
