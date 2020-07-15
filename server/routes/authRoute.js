const passport = require("passport");

module.exports = (app) => {

  app.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"]
  }));

  app.get('/auth/github',
    passport.authenticate('github', { scope: [ 'user:email' ] }));

  app.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
    res.redirect("/profile");
  });

  app.get("/auth/github/callback",passport.authenticate('github',{
    successRedirect:'/profile'
  }))

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

};

