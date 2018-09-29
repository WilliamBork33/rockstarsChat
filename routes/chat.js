var express = require("express");
var router = express.Router();

/* GET chat page. */
router.get("/", function(req, res, next) {
  if (req.user) {
    res.render("chatview", {
      appTitle: "Enroute Rockstars",
      title: "Enroute Rockstars",
      footerTitle: "Footer",
      user: req.user
    });
  } else {
    res.render("chatview", {
      appTitle: "Enroute Rockstars",
      title: "Enroute Rockstars",
      footerTitle: "Footer"
    });
  }
});

module.exports = router;
