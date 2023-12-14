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
  applyJob: (jobId, candidateId) => {
    return fetch(jobEndpoint + "/apply", {
      method: "POST",
      body: JSON.stringify({
        jobId: jobId,
        candidateId: candidateId
      }),
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
  },
  getAllJobCandidates: (jobId) => {
    return fetch(jobEndpoint + `/${jobId}/candidates`, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
