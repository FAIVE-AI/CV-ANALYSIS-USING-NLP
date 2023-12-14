const JobCandidateMapper = {
  rank: {
    columnName: "FitmentRank",
    dataType: "Int"
  },
  candidateId: {
    columnName: "CandidateId",
    dataType: "Int"
  },
  candidateName: {
    columnName: "CandidateName",
    dataType: "VarChar"
  },
  aptitudeScore: {
    columnName: "AptitudeScore",
    dataType: "Int"
  },
  skills: {
    columnName: "Skills",
    dataType: "VarChar"
  },
  matchPercent: {
    columnName: "MatchPercent",
    dataType: "Int"
  },
  experience: {
    columnName: "Experience",
    dataType: "Int"
  },
  personality: {
    columnName: "Personality",
    dataType: "VarChar"
  }
};

module.exports = JobCandidateMapper;
