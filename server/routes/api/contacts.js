const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/User");

// // @route GET api/contacts/
// @desc Get a user's contacts
// @access Private
router.get("/", passport.authenticate('jwt', { session: false }), 
async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        let contacts = [];
        for (const contactId of user.contacts) {
            try {
                const contact = await User.findById(contactId);
                let data = {
                    id: contact.id,
                    name: contact.name,
                    username: contact.username,
                    needAHand: contact.needAHand
                }
    
                // Data is given based on user privacy settings
                if (contact.settings[2] || contact.settings[0] || contact.settings[1]) {
                    data.covidStatus = contact.covidStatus;
                    data.otherStatus = contact.otherStatus;
                    data.activities = contact.activities;
                }
                if (contact.settings[3] == false) {
                    data.contacts = contact.contacts;
                }
                contacts.push(data);
            }
            catch(err) {
                console.log(err)
            };
        }
        console.log(contacts)
        res.json(contacts);
    }
    catch(err) {
        res.status(400).json(err);
    }
});

// // @route POST api/contacts/add
// @desc Add a contact - do both ways
// @access Private
router.post("/add", passport.authenticate('jwt', { session: false }), 
async (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            const username = req.body.username;
            User.findOne( { username: username })
                .then(otherUser => {
                    if (otherUser == null) return res.status(400).json("User not found");
                    if (user.contacts.includes(otherUser.id)) {
                        return res.json(null);
                    }
                    user.contacts.addToSet(otherUser.id);
                    user.save()
                        .then(userUpdated => {
                            otherUser.contacts.addToSet(req.user.id);
                            otherUser.save()
                                .then(otherUserUpdated => {
                                    let data = {
                                        id: otherUserUpdated.id,
                                        name: otherUserUpdated.name,
                                        username: otherUserUpdated.username,
                                        needAHand: otherUserUpdated.needAHand
                                    }
                        
                                    // Data is given based on user privacy settings
                                    if (otherUserUpdated.settings[2] || otherUserUpdated.settings[0] || otherUserUpdated.settings[1]) {
                                        data.covidStatus = otherUserUpdated.covidStatus;
                                        data.otherStatus = otherUserUpdated.otherStatus;
                                        data.activities = otherUserUpdated.activities;
                                    }
                                    if (otherUserUpdated.settings[3] == false) {
                                        data.contacts = otherUserUpdated.contacts;
                                    }
                                    res.json(data);
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