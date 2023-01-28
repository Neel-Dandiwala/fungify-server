const jwt = require("jsonwebtoken");
const userModel = require("../modal/user.modal");
// const User = require("../model/user.modal");

exports.verifyuser = async (req, res, next) => {
  const tok = req.headers.cookie;
  const authHeader = tok.split("=")[1].split(";")[0];
  // console.log(authHeader);

  if (authHeader) {
    const token = authHeader;

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }

      const student = await userModel.findOne({ _id: user._id });

      if (!student) {
        return res.status(403).json("User not found!");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};
