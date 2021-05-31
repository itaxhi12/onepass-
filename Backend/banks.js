const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const express = require("express");
const { encrypt } = require("./hash");
const secret = "afhakjfgakfg&*%^$%^afasdk";

const router = express.Router();
const BankSchema = mongoose.Schema(
  {
    bank_name: {
      type: String,
      required: true,
    },
    acc_no: {
      type: Object,
      required: true,
    },
    ifsc: {
      type: Object,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    telephone: {
      type: Object,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
  },
  {
    collection: "banks",
  }
);

const bank = mongoose.model("Bank Schema", BankSchema);
router.post("/bank", async (req, res) => {
  let { bank_name, acc_no, ifsc, branch, telephone, note } = req.body;
  acc_no = encrypt(acc_no);
  ifsc = encrypt(ifsc);
  telephone = encrypt(telephone);

  try {
    const response = await bank.create({
      bank_name,
      acc_no,
      ifsc,
      branch,
      telephone,
      note,
    });
    res.json({ status: "okay" });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
    });
  }
});
router.get("/bank", async (req, res) => {
  const token = req.header("Auth");
  if (token) {
    const verification = jwt.verify(token, secret);
    if (verification) {
      let Banks = await bank.find({});
      Banks.map((bank) => {
        bank.telephone = decrypt(bank.telephone);
        bank.ifsc = decrypt(bank.ifsc);
        bank.acc_no = decrypt(bank.acc_no);
      });
      res.status(200).json(Banks);
    } else {
      res.status(200).json({ message: "User Unauthorized" });
    }
  } else {
    res.status(200).json({ message: "User Unauthorized" });
  }
});
router.put("/bank/:id", (req, res) => {
  let { bank_name, acc_no, ifsc, branch, telephone, note } = req.body;
  acc_no = encrypt(acc_no);
  ifsc = encrypt(ifsc);
  telephone = encrypt(telephone);
    bank.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        bank_name: bank_name,
        acc_no: acc_no,
        ifsc: ifsc,
        branch: branch,
        telephone: telephone,
        note: note,
      },
    },
    { new: true, useFindAndModify: false },
    (err, data) => {
      res.send("updated");
      res.end();
    }
  );
});
router.delete("/bank/:_id", (req, res) => {
  bank.findByIdAndDelete({ _id: req.params._id }, (err, r) => {
    if (err) {
      res.send(err);
      res.end();
    } else {
      res.send("done");
      res.end();
    }
  });
});
module.exports = { router, bank };
