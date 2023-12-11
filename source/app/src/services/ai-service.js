import serverConfig from "../serverConfig.json";

const aiEndpoint = serverConfig.AI_URL;

export const AIService = {
  getPersonalityTypes: (data) => {
    return fetch(aiEndpoint + "/predict", {
      method: "POST",
      body: JSON.stringify({ introduction: data }),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
