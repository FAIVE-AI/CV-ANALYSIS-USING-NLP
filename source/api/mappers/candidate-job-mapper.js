const CandidateJobMapper = {
  jobId: {
    columnName: "JobID",
    dataType: "Int"
  },
  candidateId: {
    columnName: "CandidateID",
    dataType: "Int"
  },
  fitmentRank: {
    columnName: "FitmentRank",
    dataType: "Int"
  },
  matchPercent: {
    columnName: "MatchPercent",
    dataType: "Int"
  },
  candidateStatus: {
    columnName: "CandidateStatus",
    dataType: "VarChar"
  }
};

module.exports = CandidateJobMapper;
