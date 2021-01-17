const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

require('dotenv').config();

const app = express();
const serverPort = process.env.PORT || 5000;

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Routes
const users = require("./routes/api/users");
const activities = require("./routes/api/activities");
const contacts = require("./routes/api/contacts");
const notifications = require("./routes/api/notifications");
const settings = require("./routes/api/settings");

// Mongo Atlas Config
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established successfully');
})

// CORS middleware - we're allowing all origins by not giving any arguments
app.use(cors());

// Passport middleware
app.use(passport.initialize());
require("./config/passport")(passport);


// Routes
app.use("/api/users", users);
app.use("/api/activities", activities);
app.use("/api/contacts", contacts);
app.use("/api/notifications", notifications);
app.use("/api/settings", settings);

app.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}`);
})