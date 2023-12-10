import serverConfig from "../serverConfig.json";

const aiEndpoint = serverConfig.AI_URL;

export const AIService = {
  getPersonalityTypes: (introduction) => {
    return fetch(aiEndpoint + "/predict", {
      method: "POST",
      body: JSON.stringify(introduction),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
