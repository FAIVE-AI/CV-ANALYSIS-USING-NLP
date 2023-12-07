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
        ? `SELECT LoginPassword FROM Candidate WHERE ID=${req.body.id};`
        : `SELECT LoginPassword FROM HRExecutive WHERE ID=${req.body.id};`
        //   try {
//     const jobId = req.params.jobid;
//     console.log(request,"jhkhghhhhhhhhhhhhhhhhhhhhhhhhhh")
//     executeDBQuery(
//       "SELECT",
//       `SELECT * FROM JobCandidate WHERE JobID=${jobId};`
//     ).then((results) => {
//       res.send(results);
//     });
//   } catch (error) {
//     res.status(500).send(error);
//   }
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
      "INSERT INTO Candidate VALUES (@CandidateName, @EmailID, @PersonalityScore, @AptitudeScore, @LoginPassword)",
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

//Created for JobPostings by PC
router.get("/hr-ranklist/", (req, res) => {
  try {
    executeDBQuery(
      "SELECT" , 
      "SELECT * FROM JobPosting",
    ).then((results) => {

      res.send(results);

    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//Created for RanklistList Table by PC
router.get("/candidate-list/:jobid", (req, res) => {
  try {
    const jobId = req.params.jobid;
    executeDBQuery(
      "SELECT" , 
      `SELECT FitmentRank, Candidate.CandidateName, CandidateResume.Skills
        FROM Candidate 
        INNER JOIN JobCandidate ON Candidate.ID = JobCandidate.CandidateID
        INNER JOIN CandidateResume ON Candidate.ID = CandidateResume.CandidateID
        WHERE JobCandidate.JobID = ${jobId};`
    //`SELECT * FROM JobCandidate WHERE JobID=${jobId};`,
    ).then((results) => {

      res.send(results);

    });
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
