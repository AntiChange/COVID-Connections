const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  contacts: {
    type: [Object],
    required: true,
    default: []
  }, // {userId, tier}
  settings: {
    type: [Boolean],
    required: true,
    default: [false, false, false, true, true]
  }, // Show Status to Close Contacts, Show Status to Other Contacts, Show Status to Non-Contacts, Hide My Connections, Hide Me From Other's Connections List
  notifications: {
    type: [String],
    required: true,
    default: []
  },
  activities: {
    type: [Object],
    required: true,
    default: []
  }, // {name: String, date: Date}
  covidStatus: {
    type: String,
    required: true,
    default: "None"
  },
  otherStatus: {
    type: String,
    required: true,
    default: "None"
  },
  needAHand: {
    type: [String],
    required: true,
    default: []
  }
});

module.exports = User = mongoose.model("users", UserSchema);