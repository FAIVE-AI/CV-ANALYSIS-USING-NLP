var express = require("express");
var executeDBQuery = require("../db-connection");
const router = express.Router();
const JobPostingMapper = require("../mappers/job-posting-mapper");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// Job Creation
// Post body contains the job details that will be created by the HR.
// Post Body will check if the job already exists.
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
    try {
      executeDBQuery(
        "SELECT",
        'SELECT Title, JobLocation FROM JobPosting'
      ).then((results) => {
        const result = results;
        let flag = false
        results.forEach(element => {
          if((req.body.Title === element?.Title?.value)&&(req.body.JobLocation === element?.JobLocation?.value)){
            flag = true
          }
        });
        if (flag) {
          res.status(401).send({
            error: "Job Posting already exists!"
          });
        } else {
          executeDBQuery(
            "INSERT",
            "INSERT INTO JobPosting VALUES (@Title, @JobLocation, @LastDate, @Wages, @JobDescription, @JobQualification)",
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
        }
      });
    } catch (error) {
      res.status(500).send(error);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Candidate Final Report
// Gets the overall report of the candidate
router.get("/candidatereport/:candidatename", (req, res) => {
  try {
    executeDBQuery(
      "SELECT",
      `SELECT SkillsetScore, PersonalityScore, AptitudeScore, Skillset, PersonalityType, Experience, PersonalityDescription FROM Candidate WHERE Name=${req.body.candidatename};`
    ).then((results) => {
      const result = results[0];
      if (result) {
        res.status(200).send({result});
      } else {
        res.status(401).send({
          error: "Candidate Details not found"
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
router.get("/candidate-list/", (req, res) => {
  try {
    executeDBQuery(
      "SELECT" , 
      "SELECT * FROM JobCandidate"
    ).then((results) => {

      res.send(results);

    });
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;
