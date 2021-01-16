const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

// Protected route example
router.get("/me", passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json(req.user);
});

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {

  User.findOne({ email: req.body.email }).then(user => {
      if (user) {
          return res.status(400).json({ email: "Email already exists" });
      } else {
          const newUser = new User({
              name: req.body.name,
              email: req.body.email,
              password: req.body.password
          });
          // Hash password before saving in database
          bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser.save()
                      .then(user => {
                          res.status(200).json({ success: true })
                      })
                      .catch(err => console.log(err));
              });
          });
      }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
  // Check if user exists
  if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
  }

  // Check password
  bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
          // Create JWT Payload
          const payload = {
              id: user.id,
              name: user.name,
              email: user.email
          };
          // Sign token
          jwt.sign(
              payload,
              process.env.SECRET_OR_KEY,
              {expiresIn: 259200}, // 3 days
              (err, token) => {
                  if (err) {
                    console.log(err);
                    res.status(500);
                  }
                  else {
                    user.token = token;
                    user.save()
                        .then(user => res.json({
                          success: true,
                          token: "Bearer " + token
                        }))
                        .catch(err => console.log(err))
                  }
              }
          );
      } else {
          return res.status(400).json({ passwordincorrect: "Password incorrect" });
      }
  });
  });
});


module.exports = router;