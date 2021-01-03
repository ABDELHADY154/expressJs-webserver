var express = require("express");
var app = express();
var cookieParser = require("cookie-parser");
var fs = require("fs");
app.use(cookieParser());

var users = require("./users.json");
exports.HomeController = (req, res) => {
  if (req.cookies.didlogin == "true") {
    res.redirect("/home");
  } else {
    res.cookie("didlogin", "false");
    res.layout("index", { layout: "layout", title: "Home" });
  }
};

exports.LoginController = (req, res) => {
  if (req.cookies.didlogin == "true") {
    res.redirect("/");
  } else {
    res.layout("login", {
      layout: "layout",
      title: "Login",
      error: "",
    });
  }
};
exports.LoginFormController = (req, res) => {
  for (const key in users) {
    const element = users[key];
    if (
      req.body.email == element.email &&
      req.body.password == element.password
    ) {
      res.cookie("didlogin", "true");
      res.cookie("user", JSON.stringify(element));
      res.redirect("/home");
    }
  }
  for (const key in users) {
    const element = users[key];
    if (
      req.body.email !== element.email ||
      req.body.password !== element.password
    ) {
      res.layout("login", {
        layout: "layout",
        title: "Login",
        error: "Enter a valid email or password",
      });
    }
  }
};
exports.ProfileController = (req, res) => {
  if (req.cookies.didlogin == "true") {
    var userData = JSON.parse(req.cookies.user);
    res.layout("home", { layout: "layout", title: "home", user: userData });
  } else {
    res.redirect("/login");
  }
};

exports.RegisterController = (req, res) => {
  if (req.cookies.didlogin == "true") {
    res.redirect("/");
  } else {
    res.layout("register", {
      layout: "layout",
      title: "Register",
      error: "",
    });
  }
};

exports.RegisterFormController = (req, res) => {
  if (req.body.fullName && req.body.email && req.body.password) {
    res.cookie("didlogin", "true");
    var user = {
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
    };
    res.cookie("user", JSON.stringify(user));
    users.push(user);
    fs.writeFile("users.json", JSON.stringify(users), function (err) {
      if (err) return console.log(err);
    });
    res.redirect("/home");
  } else {
    res.layout("register", {
      layout: "layout",
      title: "Login",
      error: "enter a valid data",
    });
  }
};
exports.logoutController = (req, res) => {
  res.cookie("didlogin", "false");
  res.clearCookie("user");
  res.redirect("/");
};
