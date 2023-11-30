var express = require("express");
var executeDBQuery = require("../db-connection");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// Candidate Final Report
//Gets the overall report of the candidate
router.post("/candidatereport/:candidatename", (req, res) => {
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
            authenticated: false,
            error: "Candidate Details not found"
          });
        }
      });
    } catch (error) {
      res.status(500).send(error);
    }
  });

module.exports = router;
