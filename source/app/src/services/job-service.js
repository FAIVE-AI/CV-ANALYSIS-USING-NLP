import serverConfig from "../serverConfig.json";

const jobEndpoint = serverConfig.SERVER_URL + "/job";

export const JobService = {
  postJob: (job) => {
    return fetch(jobEndpoint + "/create", {
      method: "POST",
      body: JSON.stringify(job),
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  getAllJobs: () => {
    return fetch(jobEndpoint + "/all", {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
