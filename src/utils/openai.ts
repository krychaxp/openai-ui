const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: window.OPENAI_API_KEY ?? "",
});

export const openai = new OpenAIApi(configuration);
