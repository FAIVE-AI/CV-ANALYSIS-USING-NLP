class Candidate {
  id;
  candidateName;
  emailID;
  personalityTypes;
  aptitudeScore;
  constructor(id, candidateName, emailID, personalityTypes, aptitudeScore) {
    this.id = id;
    this.candidateName = candidateName;
    this.emailID = emailID;
    this.personalityTypes = personalityTypes;
    this.aptitudeScore = aptitudeScore;
  }
}

module.exports = Candidate;
