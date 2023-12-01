import serverConfig from "../serverConfig.json";

const hrportalEndpoint = serverConfig.SERVER_URL + "/hrportal";

export const HRService = {
  
  viewjob: () => {
    return fetch(hrportalEndpoint + "/view", {
        method: "GET",
        headers: {
         "Content-Type": "application/json"
        }
     });
   },
  
   jobPosting: (jobDetails) => {
      return fetch(hrportalEndpoint + "/jobposting", {
        method: "POST",
        body: JSON.stringify(jobDetails),
        headers: {
          "Content-Type": "application/json"
        }
      });
    },

    candidateReport: () => {
      return fetch(hrportalEndpoint + "/candidatereport", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
};