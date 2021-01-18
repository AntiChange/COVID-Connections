const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/User");

// // @route GET api/activities/:id
// @desc Get all activities
// @access Private
router.get("/:id", passport.authenticate('jwt', { session: false }), 
async (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user.activities))
        .catch(err => res.status(400).json(err));
});

// // @route POST api/activities/add
// @desc Add activity
// @access Private
router.post("/add", passport.authenticate('jwt', { session: false }), 
async (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            user.activities.push(req.body.activity);
            if (user.activities.length > 10) { // Pop one if the list is longer than 10 items
                user.activities.shift();
            }
            user.save()
                .then(userUpdated => res.json(userUpdated.activities))
                .catch(err => res.status(400).json(err))
        })
        .catch(err => res.status(400).json(err));
});

module.exports = router;