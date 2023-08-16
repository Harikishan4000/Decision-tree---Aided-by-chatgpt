const express = require("express");
const fs= require("fs");
const cors=require("cors");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const app = express();

app.use(cors());
const middle = express.urlencoded({
    extended: false,
    limit: 10000,
    parameterLimit: 1,

});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/upload", middle, async (req, res) => {
  try {
    const prompt = req.body.query;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `
              You are a friendly AI chatbot. Prefix all your responses with 'Bot:'
              ###
              ${prompt}
            `,
      max_tokens: 1000,
      temperature: 0.8,
    });
    console.log(prompt);
    fs.writeFile('output.txt','', function cleared(){ console.log("File is cleared.")});
    fs.writeFile('output.txt', response.data.choices[0].text, function finished(err){console.log("Finished")});
    return res.status(200).json({
      success: true,
      data: response.data.choices[0].text,
    });

    

    

  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.response
        ? error.response.data
        : "There was an issue on the server",
    });
  }
});

// const port = process.env.PORT || 5000;

// app.listen(port, () => console.log(`Server listening on port ${port}`));

app.listen(5000);
