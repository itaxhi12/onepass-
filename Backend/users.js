const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const preference = require("./userpreference").model;

const secret = "afhakjfgakfg&*%^$%^afasdk";
const bcrypt = require("bcryptjs");
const { encrypt, decrypt } = require("./hash");
const router = express.Router();

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: Object,
      required: true,
    },
    hint: {
      type: String,
      required: true,
    },
  },
  {
    collection: "users",
  }
);

const model = mongoose.model("userSchema", userSchema);
router.post("/register", async (req, res) => {
  model
    .find({})
    .then((db) => {
      if (db.length > 0) {
        mongoose.connection.db
          .dropDatabase()
          .then(console.log("done"))
          .catch((er) => console.log(er));
      }
    })
    .catch((err) => console.log(err));
  let { username, password, hint } = req.body;

  password = encrypt(password);
  try {
    let response = await model.create({
      username,
      password,
      hint,
    });
    let res = await preference.create({
      length: 8,
      isUpper: false,
      isLower: true,
      isNumber: false,
      isSpecial: false,
      generalChar: false,
      specialChar: false,
      parenthesis: false,
      exclusion: "!@#$%^&*-.,?_`~;:+=<>|/(){}[]",
    });
    res.status(200).send({ status: "okay" });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
    });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  let User = await model.findOne({ username }).lean();
  let ogpass = decrypt(User.pass)
  if (!User) {
    return res
      .status(403)
      .send({ status: "error", error: "Invalid username or password" });
  }
  if (password === ogpass) {
    const token = jwt.sign(User, secret);
    res.status(200).send({
      data: token,
    });
  } else {
    res.status(403);
    res.json({ error: "Invalid username or password" });
  }
  console.log(username);
});
router.get("/creds", async (req, res) => {
  const User = await model.findOne({});
  res.status(200).json({ username: User.username, hint: User.hint });
});

router.post("/changepass", async (req, res) => {
  const { OldPassword, NewPassword } = req.body;
  
  const User = await model.findOne({}).lean();
  let ogpass = decrypt(User.password)
  if (OldPassword === ogpass) {
    const newpass = encrypt(NewPassword);
    try {
      model.findByIdAndUpdate(
        User._id,
        { password: newpass },
        { useFindAndModify: false },
        function (err, docs) {
          if (err) {
            console.log(err);
          }
        }
      );
      return res.status(200).json({ message: "Password Updated" });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(401).json({ message: "User Unauthorize" });
  }
});
router.put("/changeusername", async (req, res) => {
  const { Username } = req.body;
  const User = await model.findOne({});

  try {
    model.findByIdAndUpdate(
      User._id,
      { username: Username },
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
});

router.put("/changehint", async (req, res) => {
  const { hint } = req.body;
  const User = await model.findOne({});

  try {
    model.findByIdAndUpdate(
      User._id,
      { hint: hint },
      { useFindAndModify: false },
      function (err, docs) {
        if (err) {
          console.log(err);
        }
      }
    );
    return res.status(200).json({ message: "Hint Updated" });
  } catch (err) {
    console.log(err);
  }
});
router.post("/masterdelete", async (req, res) => {
  const { password } = req.body;
  const User = await model.findOne({});
  if (password) {
    if (await bcrypt.compare(password, User.password)) {
      try {
        mongoose.connection.db.dropDatabase().then(() => {
          return res.status(200).json({ message: "user deleted" });
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      res.status(400).json({ message: "User unauthorized" });
    }
  } else {
    res.status(400).json({ message: "User unauthorized" });
  }
});

module.exports = { router, model };
