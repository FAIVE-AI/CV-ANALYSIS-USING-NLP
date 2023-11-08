class JobPosting {
  id;
  hrId;
  title;
  jobLocation;
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
    jobLocation,
    postedDate,
    lastDate,
    wages,
    skills,
    personality,
    education,
    experience
  ) {
    this.id = id;
    this.hrId = hrId;
    this.title = title;
    this.jobLocation = jobLocation;
    this.postedDate = postedDate;
    this.lastDate = lastDate;
    this.wages = wages;
    this.skills = skills;
    this.personality = personality;
    this.education = education;
    this.experience = experience;
  }
}

module.exports = JobPosting;
