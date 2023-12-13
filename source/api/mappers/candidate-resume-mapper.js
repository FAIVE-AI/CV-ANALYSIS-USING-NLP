const CandidateResumeMapper = {
  candidateId: {
    columnName: "CandidateID",
    dataType: "Int"
  },
  skills: {
    columnName: "Skills",
    dataType: "VarChar"
  },
  personality: {
    columnName: "Personality",
    dataType: "VarChar"
  },
  education: {
    columnName: "Education",
    dataType: "VarChar"
  },
  experience: {
    columnName: "Experience",
    dataType: "Int"
  }
};

module.exports = CandidateResumeMapper;
