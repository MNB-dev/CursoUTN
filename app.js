const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const jwt = require("jsonwebtoken");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/productos");
const app = express();

app.set("secretKey", "dn20214");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

function validateUser(req, res, next) {
  const token = req.headers["authorization"].split("Bearer ")[1];
  jwt.verify(token, req.app.get("secretKey"), function (err, decoded) {
    if (err) {
      res.json({ message: err.message });
    } else {
      console.log(decoded);
      next();
    }
  });
}
app.validateUser = validateUser;

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({ error: true, message: err.message });
});

module.exports = app;
