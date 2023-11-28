import serverConfig from "../serverConfig.json";

const candidateReportEndpoint = serverConfig.SERVER_URL + "/candidateReport";

export const AuthService = {
    candidateReport: (candidateReportDetails) => {
      return fetch(candidateReportEndpoint + "/candidatereport", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
};