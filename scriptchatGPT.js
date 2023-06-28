const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  async function runCompletion () {
    const completion = await openai.createCompletion({
    model: "ada-002",
    prompt: "How are you today?",
    max_tokens:100
    });
    console.log(completion.data.choices[0].text);
}

runCompletion();