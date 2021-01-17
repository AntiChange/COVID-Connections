const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/User");

// // @route GET api/settings/
// @desc Get all settings
// @access Private
router.get("/", passport.authenticate('jwt', { session: false }), 
async (req, res) => {
    User.findById(req.user.id)
        .then(user => res.json(user.settings))
        .catch(err => res.status(400).json(err));
});

// // @route POST api/settings/edit
// @desc Edit settings
// @access Private
router.post("/edit", passport.authenticate('jwt', { session: false }), 
async (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            user.settings = req.body.settings;
            user.save()
                .then(user => res.json(user.settings))
                .catch(err => res.status(400).json(err))
        })
        .catch(err => res.status(400).json(err));
});

// // @route POST api/settings/covidStatus
// @desc Edit covidStatus
// @access Private
router.post("/covidStatus", passport.authenticate('jwt', { session: false }), 
async (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            user.covidStatus = req.body.covidStatus;
            user.save()
                .then(user => res.json(user.covidStatus))
                .catch(err => res.status(400).json(err))
        })
        .catch(err => res.status(400).json(err));
});

// // @route POST api/settings/otherStatus
// @desc Edit otherStatus
// @access Private
router.post("/otherStatus", passport.authenticate('jwt', { session: false }), 
async (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            user.otherStatus = req.body.otherStatus;
            user.save()
                .then(user => res.json(user.otherStatus))
                .catch(err => res.status(400).json(err))
        })
        .catch(err => res.status(400).json(err));
});

// // @route GET api/settings/need-a-hand/:id
// @desc Get all need-a-hand of any user
// @access Private
router.get("/need-a-hand/:userId", passport.authenticate('jwt', { session: false }), 
async (req, res) => {
    User.findById(userId)
        .then(user => res.json(user.needAHand))
        .catch(err => res.status(400).json(err));
});

// // @route POST api/settings/need-a-hand/edit
// @desc Edit need-a-hand list
// @access Private
router.post("/need-a-hand/edit", passport.authenticate('jwt', { session: false }), 
async (req, res) => {
    User.findById(userId)
        .then(user => {
            user.needAHand = req.body.needAHand;
            user.save()
                .then(user => res.json(user.needAHand))
                .catch(err => res.status(400).json(err))
        })
        .catch(err => res.status(400).json(err));
});

module.exports = router;