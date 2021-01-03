var express = require("express");
var app = express();
var bodyParser = require("body-parser");
bodyParser = bodyParser.urlencoded({ extended: false });
var cookieParser = require("cookie-parser");
app.use(cookieParser());
var controller = require("./controller.js");
app.set("view engine", "ejs");
app.use(require("ejs-yield"));
var users = require("./users.json");

app.get("/", function (req, res) {
  controller.HomeController(req, res);
});
app.get("/login", function (req, res) {
  controller.LoginController(req, res);
});
app.get("/register", function (req, res) {
  controller.RegisterController(req, res);
});
app.post("/loginForm", bodyParser, function (req, res) {
  controller.LoginFormController(req, res);
});
app.post("/RegisterForm", bodyParser, function (req, res) {
  controller.RegisterFormController(req, res);
});
app.get("/home", function (req, res) {
  controller.ProfileController(req, res);
});
app.get("/logout", function (req, res) {
  controller.logoutController(req, res);
});

// fallback route
app.get("*", function (req, res) {
  res.send("page not found");
});
app.listen(3000);
