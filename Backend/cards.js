const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const express = require("express");
const { decrypt } = require("./hash");
const secret = "afhakjfgakfg&*%^$%^afasdk";

const router = express.Router();
const cardsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: Object,
      required: true,
    },
    cvv: {
      type: Object,
      required: true,
    },
    moe: {
      type: Object,
      required: true,
    },
    bankname: {
      type: String,
      required: true,
    },
    password: {
      type: Object,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
  },
  {
    collection: "cards",
  }
);

const model = mongoose.model("cards schema", cardsSchema);
router.post("/cards", async (req, res) => {
  let { name, number, cvv, moe, bankname, password, notes } = req.body;
  number = encrypt(number);
  cvv = encrypt(cvv);
  moe = encrypt(moe);
  password = encrypt(password);

  try {
    const response = await model.create({
      name,
      number,
      cvv,
      moe,
      bankname,
      password,
      notes,
    });
    res.json({ status: "okay" });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
    });
  }
});
router.get("/cards", async (req, res) => {
  const token = req.header("Auth");
  if (token) {
    const verification = jwt.verify(token, secret);
    if (verification) {
      let Cards = await model.find({});
      Cards.map((card) => {
        card.number = decrypt(card.number);
        card.cvv = decrypt(card.cvv);
        card.password = decrypt(card.password);
        card.moe = decrypt(card.moe);
      });
      res.status(200).json(Cards);
    } else {
      res.status(200).json({ message: "User Unauthorized" });
    }
  } else {
    res.status(200).json({ message: "User Unauthorized" });
  }
});
router.put("/cards/:id", (req, res) => {
  let { name, number, cvv, moe, bankname, password, notes } = req.body;
  number = encrypt(number);
  cvv = encrypt(cvv);
  moe = encrypt(moe);
  password = encrypt(password);
  model.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: name,
        number: number,
        cvv: cvv,
        moe: moe,
        bankname: bankname,
        password: password,
        notes: notes,
      },
    },
    { new: true, useFindAndModify: false },
    (err, data) => {
      res.send("updated");
      res.end();
    }
  );
});

router.delete("/cards/:_id", (req, res) => {
  model.findByIdAndDelete({ _id: req.params._id }, (err, r) => {
    if (err) {
      res.send(err);
      res.end();
    } else {
      res.send("done");
      res.end();
    }
  });
});

module.exports = { router, model };
