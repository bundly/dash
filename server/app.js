const express = require("express");
const app = express();
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
const PORT = process.env.PORT || 5000;
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI, () => {
  console.log("database connected");
});

app.use(
  cookieSession({
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoute")(app);

app.listen(PORT, () => {
  console.log("server running on " + PORT);
});
