class JobPosting {
  id;
  hrId;
  title;
  location;
  postedDate;
  lastDate;
  wages;
  skills;
  personality;
  education;
  experience;
  constructor(
    id,
    hrId,
    title,
    location,
    postedDate,
    lastDate,
    wages,
    skills,
    personality,
    education,
    experience,
    jobDescription,
    jobQualifications
  ) {
    this.id = id;
    this.hrId = hrId;
    this.title = title;
    this.location = location;
    this.postedDate = postedDate;
    this.lastDate = lastDate;
    this.wages = wages;
    this.skills = skills;
    this.personality = personality;
    this.education = education;
    this.experience = experience;
    this.jobDescription = jobDescription;
    this.jobQualifications = jobQualifications;
  }
}

module.exports = JobPosting;
