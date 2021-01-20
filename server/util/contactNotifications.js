const User = require("../models/User");

module.exports = function contactNotifications(contacts, notification) {
    contacts.forEach(id => {
        User.findById(id)
            .then(user => {
                user.notifications.push(notification);
                user.save()
                    .catch(err => console.log(err))
            })
    });
}