class JobCandidate {
  jobId;
  candidateId;
  fitmentRank;
  matchPercent;
  candidateStatus;

  constructor(jobId, candidateId, fitmentRank, matchPercent, candidateStatus) {
    this.jobId = jobId;
    this.candidateId = candidateId;
    this.fitmentRank = fitmentRank;
    this.matchPercent = matchPercent;
    this.candidateStatus = candidateStatus;
  }
}

module.exports = JobCandidate;
