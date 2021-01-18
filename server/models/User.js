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
    type: [Schema.Types.ObjectId],
    required: true,
    default: []
  },
  settings: {
    type: [Boolean],
    required: true,
    default: [true, true, false, false, false]
  }, // Show Status to Close Contacts, Show Status to Other Contacts, Show Status to Non-Contacts, Hide My Connections, Hide Me From Other's Connections List
  notifications: {
    type: [String],
    required: true,
    default: []
  },
  activities: {
    type: [String], // Add dates into string in preprocessing
    required: true,
    default: []
  }, // {name: String, date: Date}
  covidStatus: {
    type: String,
    required: true,
    default: "noExposure"
  },
  otherStatus: {
    type: String,
    required: true,
    default: "isolationFalse"
  },
  needAHand: {
    type: [String],
    required: true,
    default: []
  }
});

module.exports = User = mongoose.model("users", UserSchema);