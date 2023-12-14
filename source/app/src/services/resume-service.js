import serverConfig from "../serverConfig.json";

const resumeEndpoint = serverConfig.SERVER_URL + "/candidate-resume";

export const ResumeService = {
  postResume: (resume) => {
    return fetch(resumeEndpoint + "/submit", {
      method: "POST",
      body: JSON.stringify(resume),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
