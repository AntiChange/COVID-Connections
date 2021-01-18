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
            const contact = req.body.contact;
            User.findById(contact.id)
                .then(otherUser => {
                    user.contacts.push(contact);
                    user.save()
                        .then(userUpdated => {
                            otherUser.contacts.push({id: req.user.id, type: req.body.contact.type});
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
            const contact = req.body.contact;
            User.findById(contact.id)
                .then(otherUser => {
                    var index = -1;
                    for (var i = 0; i < otherUser.contacts.length; i++) {
                        if (user.contacts[i].id == req.user.id) {
                            index = i;
                            break;
                        }
                    }
                    if (index != -1) {
                        user.contacts.splice(index, 1);
                    }
                    user.save()
                        .then(userUpdated => {
                            var index2 = -1;
                            for (var i = 0; i < otherUser.contacts.length; i++) {
                                if (otherUser.contacts[i].id == req.user.id) {
                                    index2 = i;
                                    break;
                                }
                            }
                            if (index2 != -1) {
                                otherUser.contacts.splice(index, 1);
                            }
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

// // @route POST api/contacts/edit
// @desc Edit contact
// @access Private
router.post("/edit", passport.authenticate('jwt', { session: false }), 
async (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            const contact = req.body.contact;
            for (var i = 0; i < user.contacts.length; i++) {
                if (user.contacts[i].id == contact.id) {
                    user.contacts.set(i, contact)
                }
            }
            user.save()
                .then(res.json(contact))
                .catch(err => res.status(400).json(err))

        })
        .catch(err => res.status(400).json(err));
});

module.exports = router;