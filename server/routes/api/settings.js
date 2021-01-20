const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/User");
const contactNotifications = require("../../util/contactNotifications");

// // @route GET api/settings/
// @desc Get all settings
// @access Private
router.get("/", passport.authenticate('jwt', { session: false }), 
async (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            res.json(user.settings)})
        .catch(err => res.status(400).json(err));
});

// // @route POST api/settings/edit
// @desc Edit specific setting
// @access Private
router.post("/edit", passport.authenticate('jwt', { session: false }), 
async (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            user.settings.set(req.body.index, req.body.setting);
            user.save()
                .then(userUpdated => res.json(userUpdated.settings))
                .catch(err => res.status(400).json(err))
        })
        .catch(err => res.status(400).json(err));
});

// // @route POST api/settings/covidStatus
// @desc Edit covidStatus
// @access Private
router.post("/covid-status", passport.authenticate('jwt', { session: false }), 
async (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            user.covidStatus = req.body.covidStatus;
            user.save()
                .then(userUpdated => {
                    res.json(userUpdated.covidStatus);
                    
                    // Notify contacts about COVID-positive exposure (if settings allow it)
                    if (req.body.covidStatus == "positiveCase" || req.body.covidStatus == "definiteContact") {
                        if (userUpdated.settings[0] || userUpdated.settings[1]) {
                            let notification;
                            if (req.body.covidStatus == "positiveCase") {
                                notification = `${userUpdated.name} has tested positive for COVID-19. If you have come into contact with ${userUpdated.name} in the past 14 days, please self-isolate and update your status.`;
                            }
                            else {
                                notification = `${userUpdated.name} has come into contact with a confirmed COVID-19 case. If you have come into contact with ${userUpdated.name} in the past 14 days, please self-isolate and update your status.`;
                            }
                            contactNotifications(userUpdated.contacts, notification);
                        }
                    }
                })
                .catch(err => res.status(400).json(err))
        })
        .catch(err => res.status(400).json(err));
});

// // @route POST api/settings/otherStatus
// @desc Edit otherStatus
// @access Private
router.post("/other-status", passport.authenticate('jwt', { session: false }), 
async (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            user.otherStatus = req.body.otherStatus;
            user.save()
                .then(userUpdated => res.json(userUpdated.otherStatus))
                .catch(err => res.status(400).json(err))
        })
        .catch(err => res.status(400).json(err));
});

// // @route GET api/settings/need-a-hand/:id
// @desc Get all need-a-hand of any user
// @access Private
router.get("/need-a-hand/:userId", passport.authenticate('jwt', { session: false }), 
async (req, res) => {
    User.findById(req.user.id)
        .then(user => res.json(user.needAHand))
        .catch(err => res.status(400).json(err));
});

// // @route POST api/settings/need-a-hand/edit
// @desc Edit need-a-hand list
// @access Private
router.post("/need-a-hand/edit", passport.authenticate('jwt', { session: false }), 
async (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            user.needAHand = req.body.needAHand;
            user.save()
                .then(userUpdated => res.json(userUpdated.needAHand))
                .catch(err => res.status(400).json(err))
        })
        .catch(err => res.status(400).json(err));
});

module.exports = router;