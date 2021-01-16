const express = require("express");
const router = express.Router();
const User = require("../../models/User");

// Protected route example
router.get('/me', passport.authenticate('bearer', { session: false }),
  function(req, res) {
    res.json(req.user);
});

module.exports = router;