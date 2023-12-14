const JobPostingMapper = {
  id: {
    columnName: "ID",
    dataType: "Int"
  },
  title: {
    columnName: "Title",
    dataType: "VarChar"
  },
  location: {
    columnName: "JobLocation",
    dataType: "VarChar"
  },
  lastDate: {
    columnName: "LastDate",
    dataType: "DateTime"
  },
  postedDate: {
    columnName: "PostedDate",
    dataType: "DateTime"
  },
  wages: {
    columnName: "Wages",
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

module.exports = JobPostingMapper;
