var express = require("express");

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// Sample get request
router.get("/", (req, res) => {
  res.end("Version: 1.0.0");
});

module.exports = router;
