class CandidateResume {
  candidateId;
  skills;
  personality;
  education;
  experience;

  constructor(candidateId, skills, personality, education, experience) {
    this.candidateId = candidateId;
    this.skills = skills;
    this.personality = personality;
    this.education = education;
    this.experience = experience;
  }
}

module.exports = CandidateResume;
