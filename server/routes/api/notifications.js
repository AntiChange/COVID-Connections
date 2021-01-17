const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/User");

// // @route GET api/notifications/
// @desc Get all settings
// @access Private
router.get("/", passport.authenticate('jwt', { session: false }), 
async (req, res) => {
    User.findById(req.user.id)
        .then(user => res.json(user.notifications))
        .catch(err => res.status(400).json(err));
});

// // @route POST api/notifications/add
// @desc Add notification
// @access Private
router.post("/add", passport.authenticate('jwt', { session: false }), 
async (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            user.notifications.push(req.body.notification);
            user.save()
                .then(user => res.json(user.notifications))
                .catch(err => res.status(400).json(err))
        })
        .catch(err => res.status(400).json(err));
});

// // @route POST api/notifications/clear
// @desc Clear notifications
// @access Private
router.post("/clear", passport.authenticate('jwt', { session: false }), 
async (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            user.notifications = [];
            user.save()
                .then(user => res.json(user.notifications))
                .catch(err => res.status(400).json(err))
        })
        .catch(err => res.status(400).json(err));
});

module.exports = router;