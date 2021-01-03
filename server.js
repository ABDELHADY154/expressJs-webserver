var express = require("express");
var app = express();
var router = express.Router();

app.set("view engine", "ejs");
app.use(require("ejs-yield"));

app.get("/", function (req, res, next) {
  res.layout("index", { layout: "layout", title: "Express" });
});
app.get("/login", function (req, res, next) {
  res.layout("login", { layout: "layout", title: "Express" });
});

app.listen(3000);
