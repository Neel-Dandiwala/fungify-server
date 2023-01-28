const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const User = require("../modal/user.modal");
exports.registerController = (req, res) => {
  const { username, email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(400).json({
      error: firstError,
    });
  } else {
    User.findOne({
      email: email,
    }).exec(async (err, user) => {
      if (user) {
        return res.status(400).json({
          error: "Student already exists",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(password, salt);
        const user = new User({
          username,
          email,
          password: hashed_password,
        });
        console.log(user);
        user.save((err, user) => {
          if (err) {
            return res.status(400).json({
              error: "Some error occured! Please try again" + err,
            });
          } else {
            return res.status(200).json({
              success: true,
              message: user,
              message: "Register Success! Please Login now to continue.",
            });
          }
        });
      }
    });
  }
};

exports.loginController = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(400).json({
      error: firstError,
    });
  } else {
    User.findOne({
      email: email,
    }).exec(async (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User does not exists. Please register",
        });
      }

      if (!(await user.authenticate(password))) {
        return res.status(400).json({
          error: "Email and password do not match",
        });
      }

      const token = jwt.sign(
        {
          _id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      const { _id, username, email } = user;
      res.cookie("jwt", token);
      return res.json({
        token,
        user: {
          _id,
          username,
          email,
        },
      });
    });
  }
};

exports.fetchUserDataByEmail = async (req, res) => {
  // req.user contains the user id stored from in the session cookie
  console.log(req.body);

  // req.user = user._id

  // If the session cookie exists with a valid user id, then the user is logged in
  // const userData = await fetchUserData(req.user);
  if (req.user) {
    res.status(200).json({
      message: "User is logged in successfully!",
      success: true,
      user: req.user,
    });
  } else {
    res.status(401).json({
      message: "Invalid user id!",
      success: false,
    });
  }
};
