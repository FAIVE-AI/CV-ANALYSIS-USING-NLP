var express = require("express");
var executeDBQuery = require("../db-connection");
const router = express.Router();
const CandidateMapper = require("../mappers/candidate-mapper");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// User Login.
// Post body contains user ID and password.
// The password is checked for particular user ID to authenticate.
router.post("/login/:type", (req, res) => {
  try {
    executeDBQuery(
      "SELECT",
      req.params.type === "candidate"
        ? `SELECT * FROM Candidate WHERE ID=${req.body.id};`
        : `SELECT * FROM HRExecutive WHERE ID=${req.body.id};`
    ).then((results) => {
      const result = results[0];
      if (req.body.password === result?.LoginPassword?.value) {
        res.send({
          authenticated: true,
          candidateDetails: {
            id: result?.ID.value,
            candidateName: result?.CandidateName.value,
            emailId: result?.EmailID.value,
            personalityTypes: result?.PersonalityTypes.value,
            aptitudeScore: result?.AptitudeScore.value
          }
        });
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

// Candidate Register.
// Post body contains the candidate object.
router.post("/register", (req, res) => {
  const candidate = req.body;
  let queryParameters = [];
  for (let property in candidate) {
    queryParameters.push({
      columnName: CandidateMapper[property].columnName,
      dataType: CandidateMapper[property].dataType,
      value: candidate[property]
    });
  }
  try {
    executeDBQuery(
      "INSERT",
      "INSERT INTO Candidate VALUES (@CandidateName, @EmailID, @PersonalityTypes, @AptitudeScore, @LoginPassword)",
      queryParameters
    ).then((result) => {
      if (result) {
        res.status(200).send({
          message: "Successfully added candidate."
        });
      } else {
        res.status(500).send({
          error: "Something went wrong."
        });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
