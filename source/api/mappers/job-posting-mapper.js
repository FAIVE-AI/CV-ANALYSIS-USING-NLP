const JobPostingMapper = {
    title: {
      columnName: "Title",
      dataType: "VarChar"
    },
    joblocation: {
      columnName: "JobLocation",
      dataType: "VarChar"
    },
    lastdate: {
      columnName: "LastDate",
      dataType: "DateTime"
    },
    wages: {
      columnName: "Wages",
      dataType: "Int"
    },
    jobdescription: {
      columnName: "JobDescription",
      dataType: "VarChar"
    },
    jobqualification: {
        columnName: "JobQualification",
        dataType: "VarChar"
      }
  };
  
  module.exports = JobPostingMapper;