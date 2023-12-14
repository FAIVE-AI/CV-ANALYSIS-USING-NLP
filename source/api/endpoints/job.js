var express = require("express");
var executeDBQuery = require("../db-connection");
const router = express.Router();
const JobPostingMapper = require("../mappers/job-posting-mapper");
const JobCandidateMapper = require("../mappers/job-candidate-mapper");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// Candidate Resume Submission.
// Post body contains the resume object.
router.post("/create", (req, res) => {
  const jobPosting = req.body;
  let queryParameters = [];
  for (let property in jobPosting) {
    queryParameters.push({
      columnName: JobPostingMapper[property].columnName,
      dataType: JobPostingMapper[property].dataType,
      value: jobPosting[property]
    });
  }
  try {
    executeDBQuery(
      "INSERT",
      "INSERT INTO JobPosting VALUES (@HRID, @Title, @JobLocation, @PostedDate, @LastDate, @Wages, @Skills, @Personality, @Education, @Experience)",
      queryParameters
    ).then((result) => {
      if (result) {
        res.status(200).send({
          message: "Successfully added job posting."
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

// Candidate Job Application.
// Post body contains job ID and candidate ID.
router.post("/apply", (req, res) => {
  const jobPosting = req.body;
  let queryParameters = [];
  for (let property in jobPosting) {
    queryParameters.push({
      columnName: JobPostingMapper[property].columnName,
      dataType: JobPostingMapper[property].dataType,
      value: jobPosting[property]
    });
  }
  try {
    executeDBQuery(
      "INSERT",
      "INSERT INTO JobPosting VALUES (@HRID, @Title, @JobLocation, @PostedDate, @LastDate, @Wages, @Skills, @Personality, @Education, @Experience)",
      queryParameters
    ).then((result) => {
      if (result) {
        res.status(200).send({
          message: "Successfully added job posting."
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

// Gets all open jobs
router.get("/all", (req, res) => {
  try {
    executeDBQuery("SELECT", "SELECT * FROM JobPosting;").then((result) => {
      if (result) {
        let jobs = [];
        result.forEach((jobObject) => {
          let job = {};
          for (let property in jobObject) {
            let requiredProp = null;
            for (let prop in JobPostingMapper) {
              if (JobPostingMapper[prop].columnName === property)
                requiredProp = prop;
            }
            job[requiredProp] = jobObject[property].value;
          }
          jobs.push(job);
          console.log(jobs);
        });
        res.status(200).send(jobs);
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

// Gets all applicants for a job
router.get("/:jobId/candidates", (req, res) => {
  try {
    executeDBQuery(
      "SELECT",
      `SELECT JC.FitmentRank, C.ID AS CandidateId, C.CandidateName, C.AptitudeScore, CR.Skills, JC.MatchPercent, CR.Experience, CR.Personality FROM JobCandidate JC JOIN Candidate C ON JC.CandidateID = C.ID JOIN CandidateResume CR ON CR.CandidateID = C.ID WHERE JC.JobID=${Number(
        req.params.jobId
      )}`
    ).then((result) => {
      if (result) {
        let candidates = [];
        result.forEach((candidateObject) => {
          let candidate = {};
          for (let property in candidateObject) {
            let requiredProp = null;
            for (let prop in JobCandidateMapper) {
              if (JobCandidateMapper[prop].columnName === property)
                requiredProp = prop;
            }
            candidate[requiredProp] = candidateObject[property].value;
          }
          candidates.push(candidate);
          console.log(candidates);
        });
        res.status(200).send(candidates);
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
