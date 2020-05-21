var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let cors = require("cors");
let bodyParser = require("body-parser");

var indexRouter = require("./routes/index");
//API route
let apiRouter = require("./routes/api");

let app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Importing and activating the broker module
let MQTT = require("./MQTT.js");
MQTT.broker();

let apiClient = require("./Client.js");
let API = require("./API.js");
let apiInstance = new API(new apiClient());

app.use("/", indexRouter);
apiRouter.get("/boxes", (req, res) => {
  res.json(apiInstance.boxes);
});
apiRouter.put("/boxes", (req, res) => {
  console.log(`API: PUT request:`);
  console.log(req.body);
  apiInstance.updateBox(req.body);
  return res.json(req.body);
});
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
