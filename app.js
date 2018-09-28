var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// PASSPORT - Passport Requires
var passport = require("passport");
var SpotifyStrategy = require("passport-spotify").Strategy;

/* // FROM SOCKET.IO
var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
// */

/*

    if user
        script.
        var user = {
            name: `#{user.displayName}`,
            img: `#{user.photos}`
            }

    if !user
            script.
            var user = {
                name: "No Name",
                img: "No Image"
                }
   
*/

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// PASSPORT - Express Session for Passport (persistent login session middleware)
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUnititialized: true
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(passport.session());

// PASSPORT - (establish and maintain session via a browser cookie)
passport.serializeUser(function(user, done) {
  done(null, user);
});
// PASSPORT - (establish and maintain session via a browser cookie)
passport.deserializeUser(function(user, done) {
  done(null, user);
});

// PASSPORT - Use passport with Spotify dev account details
passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      callbackURL: process.env.CALLBACKURL
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      console.log(profile);
      return done(null, profile);
    }
  )
);

var indexRouter = require("./routes/index");
var loginRouter = require("./routes/login");
var profileRouter = require("./routes/profile");
// Route for passport
var authRouter = require("./routes/auth")(app, express, passport);
var logoutRouter = require("./routes/logout");
// Route for chat
var chatRouter = require("./routes/chat");

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/profile", profileRouter);
app.use("/logout", logoutRouter);
app.use("/chat", chatRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
