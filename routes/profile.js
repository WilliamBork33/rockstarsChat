var express = require("express");
var router = express.Router();

/* GET profile. */
router.get("/", function(req, res, next) {
  if (req.user) {
    res.render("profile", {
      appTitle: "Rockstars Profile",
      title: "Profile",

      user: req.user,
      footerTitle: "Footer"
    });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
