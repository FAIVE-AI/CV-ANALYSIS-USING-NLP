var express = require("express");
var executeDBQuery = require("../db-connection");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// Post body contains user ID and password. The password is checked for particular user ID to authenticate.
router.post("/login", (req, res) => {
  try {
    executeDBQuery(
      "SELECT",
      `SELECT LoginPassword FROM Candidate WHERE ID=${req.body.id};`
    ).then((results) => {
      const result = results[0];
      if (req.body.password === result?.LoginPassword?.value) {
        res.send({ authenticated: true });
      } else {
        res.status(401).send({
          authenticated: false,
          error: "Invalid user ID or password."
        });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
