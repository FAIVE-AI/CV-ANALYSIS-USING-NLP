var express = require("express");
var executeDBQuery = require("../db-connection");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

//Created for JobPostings by PC
router.get("/hr-ranklist/", (req, res) => {
  try {
    executeDBQuery("SELECT", "SELECT * FROM JobPosting").then((results) => {
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
      "SELECT",
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
