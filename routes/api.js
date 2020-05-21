let express = require("express");
let router = express.Router();
router.get("/", (req, res, next) => {
  res.send("API is up and running");
});

module.exports = router;
