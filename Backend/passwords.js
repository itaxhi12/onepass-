const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const express = require("express");
const { encrypt } = require("./hash");
const secret = "afhakjfgakfg&*%^$%^afasdk";

const router = express.Router();
const SocialSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    username: {
      type: Object,
      required: true,
    },
    email: {
      type: Object,
      required: true,
    },
    password: {
      type: Object,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
  },
  {
    collection: "socials",
  }
);

const model = mongoose.model("Social Schema", SocialSchema);
router.post("/socials", async (req, res) => {
  let { name, category, url, username, email, password, note } = req.body;
  username = encrypt(username);
  email = encrypt(email);
  password = encrypt(password);

  try {
    const response = await passwords.create({
      name,
      category,
      url,
      username,
      email,
      password,
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

router.get("/passwords", async (req, res) => {
  const token = req.header("Auth");
  if (token) {
    const verification = jwt.verify(token, secret);
    if (verification) {
      let Passwords = await model.find({});
      Passwords.map((pass) => {
        pass.username = decrypt(pass.username);
        pass.email = decrypt(pass.email);
        pass.password = decrypt(pass.password);
      });
      res.status(200).json(Passwords);
    } else {
      res.status(200).json({ message: "User Unauthorized" });
    }
  } else {
    res.status(200).json({ message: "User Unauthorized" });
  }
});

router.put("/passwords/:id", (req, res) => {
  let { name, category, url, username, email, password, note } = req.body;
  username = encrypt(username);
  email = encrypt(email);
  password = encrypt(password);
  model.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: name,
        category: category,
        url: url,
        username: username,
        email: email,
        password: password,
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

router.delete("/passwords/:_id", (req, res) => {
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
