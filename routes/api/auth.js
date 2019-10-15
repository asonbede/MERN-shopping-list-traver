const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// User Model
const User = require("../../models/User");

// @route   POST api/auth
// @desc    Auth user
// @access  Public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: "User Does not exist" });

    // Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          });
        }
      );
    });
  });
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcryptjs");
// //Item model
// const User = require("../../models/user");
// const config = require("config");
// const jwt = require("jsonwebtoken");
// const auth = require("../../middleware/auth");
// //@route post api/auth
// //@desc auth user
// //@access public

// router.post("/", (req, res) => {
//   const { email, password } = req.body;
//   //simple validation
//   if (!email || !password) {
//     return res.status(400).json({ msg: "Please enter all filds" });
//   }

//   //check for existing user,note if it returns null,!user will be true
//   User.findOne({ email }).then(user => {
//     if (!user) {
//       return res.status(400).json({ msg: "user does not exist" });
//     }

//     //validate password
//     bcrypt.compare(password, user.password).then(isMatch => {
//       if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

//       jwt.sign(
//         { id: user.id },
//         config.get("jwtSecret"),
//         { expiresIn: 3600 },
//         (err, token) => {
//           if (err) throw err;
//           res.json({
//             token,
//             user: {
//               id: user.id,
//               name: user.name,
//               email: user.email
//             }
//           });
//         }
//       );
//     });
//   });
// });

// //@route GET api/auth/user
// //@desc Get user data
// //@access private
// router.get("/user", auth, (req, res) => {
//   console.log("Five");
//   User.findById(req.user.id)
//     .select("-password")
//     .then(user => res.json(user));
// });
// module.exports = router;
