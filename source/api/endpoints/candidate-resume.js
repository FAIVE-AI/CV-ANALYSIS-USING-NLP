var express = require("express");
var executeDBQuery = require("../db-connection");
const router = express.Router();
const CandidateResumeMapper = require("../mappers/candidate-resume-mapper");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// Candidate Resume Submission.
// Post body contains the resume object.
router.post("/submit", (req, res) => {
  const resume = req.body;
  let queryParameters = [];
  for (let property in resume) {
    queryParameters.push({
      columnName: CandidateResumeMapper[property].columnName,
      dataType: CandidateResumeMapper[property].dataType,
      value: resume[property]
    });
  }
  try {
    console.log(queryParameters)
    executeDBQuery(
      "INSERT",
      "INSERT INTO CandidateResume VALUES (@CandidateID, @Skills, @Personality, @Education, @Experience)",
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
