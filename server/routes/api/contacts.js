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
                    let contacts = user.contacts;
                    contacts.push(contact);
                    user.contacts = contacts;
                    user.save()
                        .then(user => {
                            let contacts2 = otherUser.contacts;
                            contacts2.push({id: req.user.id, type: req.body.contact.type});
                            otherUser.contacts = contacts2;
                            otherUser.save()
                                .then(a => {
                                    res.json(user.contacts);
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
                    let contacts = user.contacts;
                    const index = contacts.indexOf(contact.id);
                    if (index > -1) {
                        contacts.splice(index, 1);
                    }
                    user.contacts = contacts;
                    user.save()
                        .then(user => {
                            let contacts2 = otherUser.contacts;
                            var index = -1;
                            for (var i = 0; i < contacts2.length; i++) {
                                if (contacts2[i].id == req.user.id) {
                                    index = i;
                                }
                            }
                            if (index != -1) {
                                contacts2.splice(index, 1);
                            }
                            otherUser.contacts = contacts2;
                            otherUser.save()
                                .then(a => {
                                    res.json(user.contacts);
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
            let contacts = user.contacts;
            for (var i = 0; i < contacts.length; i++) {
                if (contacts[i].id == contact.id) {
                    contacts[i] = contact;
                }
            }
            user.contacts = contacts;
            user.save()
                .then(res.json(contact))
                .catch(err => res.status(400).json(err))

        })
        .catch(err => res.status(400).json(err));
});

module.exports = router;