var express = require("express");
var router = express.Router();

/* GET login page. */
router.get("/", function(req, res, next) {
  if (req.user) {
    res.render("login", {
      appTitle: "Enroute Rockstars",
      title: "Enroute Rockstars",
      footerTitle: "Footer",
      user: req.user
    });
  } else {
    res.render("login", {
      appTitle: "Enroute Rockstars",
      title: "Enroute Rockstars",
      footerTitle: "Footer"
    });
  }
});

module.exports = router;
