const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
let fetchuser = require("../Middleware/fetchUser");
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Route 1 for ceating a new user

router.post(
  "/createUser",
  [
    body("name", "Name should contain more than three letters").isLength({
      min: 3,
    }),
    body("email", "Enter a valid email address").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    // Check whether the user with the given email already exists or not
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      success = false;
      return res
        .status(400)
        .json({ error: "Sorry a user with this email already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      success = true;
      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      res.json({ authToken, success });
    }
  }
);

//Route 2 for login of a user

//post endpoint for (login)authenticating a user
router.post(
  "/login",
  [
    body("email", "Enter a valid email address").isEmail(),
    body("password", "Password must be atleast 5 characters").exists(),
  ],
  async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with valid credentials" });
      }
      //comparing the password
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with valid credentials" });
      }

      //Generating the token for user
      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      success = true;
      return res.json({ authToken, success });
    } catch (error) {
      success = false;
      console.error(error.message);
      return res.status(500).send("Internal server Error");
    }
  }
);

// Route 3 for getting details of a logged in user "Login is required"

router.get("/getUser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    return res.send(user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal server error ");
  }
});

module.exports = router;
