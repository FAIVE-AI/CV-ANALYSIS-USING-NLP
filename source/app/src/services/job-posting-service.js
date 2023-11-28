import serverConfig from "../serverConfig.json";

const jobPostingEndpoint = serverConfig.SERVER_URL + "/jobposting";

export const JobPostingService = {
    jobPosting: (jobDetails) => {
      return fetch(jobPostingEndpoint + "/jobposting", {
        method: "POST",
        body: JSON.stringify(jobDetails),
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
};