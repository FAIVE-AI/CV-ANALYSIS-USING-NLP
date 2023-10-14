var express = require("express");
var uuid = require("uuid");

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// Sample get request
router.get("/login", (req, res) => {
  res.end("Response from auth/login endpoint.");
});

module.exports = router;
