class Candidate {
  id;
  candidateName;
  emailID;
  personalityScore;
  aptitudeScore;
  constructor(id, candidateName, emailID, personalityScore, aptitudeScore) {
    this.id = id;
    this.candidateName = candidateName;
    this.emailID = emailID;
    this.personalityScore = personalityScore;
    this.aptitudeScore = aptitudeScore;
  }
}

module.exports = Candidate;
