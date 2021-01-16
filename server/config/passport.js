const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = passport => {
    // Configure the Bearer strategy for use by Passport.

    // The Bearer strategy requires a `verify` function which receives the
    // credentials (`token`) contained in the request.  The function must invoke
    // `done` with a user object, which will be set at `req.user` in route handlers
    // after authentication.
    passport.use(new Strategy(
        function(token, done) {
        User.findOne(token, function(err, user) {
            if (err) { 
                return done(err); 
            }
            if (!user) { 
                return done(null, false); 
            }
            return done(null, user);
        });
    }));
  
};