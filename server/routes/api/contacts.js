const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/User");

// // @route GET api/contacts/
// @desc Get a user's contacts
// @access Private
router.get("/", passport.authenticate('jwt', { session: false }), 
async (req, res) => {
    User.findById(req.user.id)
        .then(user => res.json(user.contacts))
        .catch(err => res.status(400).json(err));
});

// // @route GET api/contacts/
// @desc Get a user's contacts
// @access Private
router.get("/", passport.authenticate('jwt', { session: false }), 
async (req, res) => {
    User.findById(req.user.id)
        .then(user => res.json(user.contacts))
        .catch(err => res.status(400).json(err));
});

// // @route POST api/contacts/add
// @desc Add a contact - do both ways
// @access Private
router.post("/add", passport.authenticate('jwt', { session: false }), 
async (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            const userId = req.body.userId;
            User.findById(userId)
                .then(otherUser => {
                    user.contacts.push(userId);
                    user.save()
                        .then(userUpdated => {
                            otherUser.contacts.push(req.user.id);
                            otherUser.save()
                                .then(a => {
                                    res.json(userUpdated.contacts);
                                })
                        })
                })
                .catch(err => res.status(400).json(err));

        })
        .catch(err => res.status(400).json(err));
});

// // @route POST api/contacts/remove
// @desc Remove a contact - do both ways
// @access Private
router.post("/remove", passport.authenticate('jwt', { session: false }), 
async (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            const userId = req.body.userId;
            User.findById(userId)
                .then(otherUser => {
                    user.contacts.pull(userId)
                    user.save()
                        .then(userUpdated => {
                            otherUser.contacts.pull(req.body.id);
                            otherUser.save()
                                .then(a => {
                                    res.json(userUpdated.contacts);
                                })
                        })
                })
                .catch(err => res.status(400).json(err));

        })
        .catch(err => res.status(400).json(err));
});

/*
// // @route POST api/contacts/edit
// @desc Edit contact
// @access Private
router.post("/edit", passport.authenticate('jwt', { session: false }), 
async (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            const contact = req.body.contact;
            for (var i = 0; i < user.contacts.length; i++) {
                if (user.contacts[i] == contact.id) {
                    user.contacts.set(i, contact)
                }
            }
            user.save()
                .then(res.json(contact))
                .catch(err => res.status(400).json(err))

        })
        .catch(err => res.status(400).json(err));
});*/

module.exports = router;