const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

// // @route GET api/users/:id
// @desc Get user by ID
// @access Private
router.get("/:id", passport.authenticate('jwt', { session: false }), 
async (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            let data = {
                id: user.id,
                name: user.name,
                username: user.username,
                needAHand: user.needAHand
            }
            const isSelf = (user.id == req.user.id);
            const isContact = (user.contacts.indexOf(req.user.id) != -1);

            // Data is given based on user privacy settings
            if (isSelf || user.settings[2] == true || (isContact && user.settings[0] == true) || (isContact && user.settings[1] == true)) {
                data.covidStatus = user.covidStatus;
                data.otherStatus = user.otherStatus;
                data.activities = user.activities;
            }
            if (isSelf || (user.settings[3] == false)) {
                data.contacts = user.contacts;
            }
            res.json(data);
        })
        .catch(err => res.status(400).json(err));
});

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", async (req, res) => {

  if (!req.body.username || !req.body.password) return res.status(404).json({ error: "Invalid username or password" });
  User.findOne({ username: req.body.username }).then(user => {
      if (user) {
          return res.status(400).json({ error: "Username already exists" });
      } else {
          const newUser = new User({
              name: req.body.name,
              username: req.body.username,
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
router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) return res.status(404).json({ error: "Invalid username or password" });

  // Find user by username
  User.findOne({ username }).then(user => {
  // Check if user exists
  if (!user) {
      return res.status(404).json({ error: "Username not found" });
  }

  // Check password
  bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
          // Create JWT Payload
          const payload = {
              id: user.id,
              name: user.name,
              username: user.username
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
                          user: { id: user.id, name: user.name, username: user.username, token: user.token },
                          token: "Bearer " + token
                        }))
                        .catch(err => console.log(err))
                  }
              }
          );
      } else {
          return res.status(400).json({ error: "Password incorrect" });
      }
  });
  });
});


module.exports = router;