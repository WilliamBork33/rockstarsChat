// PASSPORT - Route created to run passport
module.exports = function(app, express, passport) {
  var router = express.Router();

  // This route gets the spotify page
  router.get("/spotify", passport.authenticate("spotify"), function(req, res) {
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
  });

  // This route goes back to login on a failed login attempt
  router.get(
    "/spotify/callback",
    passport.authenticate("spotify", { failureRedirect: "/login" }),
    function(req, res) {
      // Successful authentication, redirect to profile page.
      res.redirect("/profile");
    }
  );

  app.use("/auth", router);
};
