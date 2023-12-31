import serverConfig from "../serverConfig.json";

const authEndpoint = serverConfig.SERVER_URL + "/auth";

export const AuthService = {
  candidateLogin: (credentials) => {
    return fetch(authEndpoint + "/login/candidate", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  hrExecLogin: (credentials) => {
    return fetch(authEndpoint + "/login/hr-exec", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  register: (candidate) => {
    return fetch(authEndpoint + "/register", {
      method: "POST",
      body: JSON.stringify(candidate),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
