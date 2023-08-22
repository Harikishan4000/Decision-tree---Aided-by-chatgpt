const http=require("http");
const url=require("url");
const request=require("request");
const  bodyParser=require("body-parser");


const express = require("express");
const fs= require("fs");
const cors=require("cors");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

//Initialize Express App
const app = express();

//middleware
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


//restricted resources on a web page to be accessed
app.use(cors());
const middle = express.urlencoded({
    extended: false,
    limit: 10000,
    parameterLimit: 1,

});



//Serving static files(public folder)
app.use(express.static(__dirname + '/public'));


//HTTP routing using express.js
//res.sendFile() sets the Content-Type response HTTP header field based on the filename extension
app.get('/', (req, res)=>{
  res.sendFile(__dirname+'/views/indexform.html');  // GET request
})

app.get('/tree', (req, res)=>{
  res.sendFile(__dirname+'/views/index.html');// GET request
})

app.get('/sharetree', (req, res)=>{
  res.sendFile(__dirname+'/views/indexshares.html');// GET request
})

app.get('/maps', (req, res)=>{
  res.sendFile(__dirname+'/views/indexmaps.html');
})

//to GET output.json (which contains the final output)
app.get('/get-json', (req, res) => {
  
  res.sendFile(__dirname+ '/output.json');
});

//Loading the openAI key from the .env file
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/upload", middle, async (req, res) => {
  try {
    fs.writeFile('./output.json','', function cleared(){ console.log("File is cleared.");});

    const prompt = req.body.query;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `
                 Your job is to convert the a set of statements which represent certain events into decision tree nodes and convert them into single dimensional array JSON format. Create a decision tree node for each statement. There must be two types of nodes, decision node and cost node.Decision nodes are those that lead to other events taking place. They do not have probabilities attached to them. Cost nodes are the nodes whose children have certain probabilities associated with them. The nodes at the end are the nodes that do not have any children. They can be either have positive or negative values. Each node can have only one parent node but a parent can have multiple children nodes. Create the output in json format with fields: \n id: root node is 0 and increment the id for each new node\n name of node: Mentions the name of the node, type of node: Mentions if it is \"cost\", \"decision\", or \"root-decision\" "\n level: Mentions the level at which the node is present with respect to the root node,\n payoff: if it is a cost node, \n probability: if it is a decision node,\n parent: id of the parent of the current node\n children: which consists of the array of the ids of the children of the current node, empty array if it has no children\n\n Note that while creating the JSON data: \n 1. Make sure all characters are lowercase\n2. The first node is always of type \"root\"\n 3. If a node has a parent, its id should be present in the children array of only that parent and nothing else.\n 4. Do not give any conclusions or extra information about why you came to that answer, just give a single dimensional JSON format as the response.\n 5. Make sure all the fields of the json exist at all times.\n6. Name the nodes appropriately.\n 7. Don't make new nodes just for the payoffs, add the payoff to the appropriate existing node\n 8. If there is not payoff given with the node, keep it as null.\n 9. If there is no probability given with the node, keep it as null.\n 10.  Convert all probabilities to decimal values.\n 11. Make sure the children array is filled if the node has children, or if any other node refers to it as a parent.\n 12. If the node's children have probability, always make the current node a cost node.\n 13. If the node's children array is empty, consider it to be an end node with value.\n\n14. Make sure that this entire JSON has only a single dimensional unnamed array to encapsulate the entire rest of the data.\n\n 15. If there is no input, return empty JSON data. \n\n
              ###
              ${prompt}`
            ,
      max_tokens: 2000,
      temperature: 0.5,
    });


    try {

      fs.writeFile('output.json', response.data.choices[0].text, function finished(err){console.log("Finished")});
    } catch (error) {
      console.log(error);
    }

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



app.post("/uploadShares", middle, async(req, res)=>{

  const prompt1 = req.body.share1;
  const prompt2 = req.body.share2;
  const prompt3 = req.body.share3;

  let i=0;
  if(prompt1!="undefined") i++;
  if(prompt2!="undefined") i++;
  if(prompt3!="undefined") i++;

console.log("Number of shares: ", i);
  var url1 = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol='+prompt1+'&outputsize=compact&apikey=IVZT8PQDD7P489XN';

  request.get({
      url: url1,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        console.log('Error:', err);
      } else if (res.statusCode !== 200) {
        console.log('Status:', res.statusCode);
      } else {
        let myData=JSON.stringify(data);
        // data is successfully parsed as a JSON object:
        fs.writeFile('./ShareDataAnalysis/share1Data.json',myData.toString(), function printed(){ console.log("ShareData1 is printed.")});
      }
  });


  var url2 = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol='+prompt2+'&outputsize=compact&apikey=IVZT8PQDD7P489XN';

  request.get({
      url: url2,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        console.log('Error:', err);
      } else if (res.statusCode !== 200) {
        console.log('Status:', res.statusCode);
      } else {
        let myData=JSON.stringify(data);
        // data is successfully parsed as a JSON object:
        fs.writeFile('/ShareDataAnalysis/share2Data.json',myData.toString(), function printed(){ console.log("ShareData2 is printed.")});
      }
  });


  var url3 = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol='+prompt3+'&outputsize=compact&apikey=IVZT8PQDD7P489XN';


  request.get({
      url: url3,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        console.log('Error:', err);
      } else if (res.statusCode !== 200) {
        console.log('Status:', res.statusCode);
      } else {
        let myData=JSON.stringify(data);
        // data is successfully parsed as a JSON object:
        fs.writeFile('/ShareDataAnalysis/share3Data.json',myData.toString(), function printed(){ console.log("ShareData3 is printed.")});
      }

  });

  //Copying json from loader to output file

  fs.writeFile('/ShareDataAnalysis/outputShares.json', '', 'utf8', function(){console.log('...')})

  fs.readFile('ShareDataAnalysis/outputSharesLoader.json', 'utf8', readingFile);
 
function readingFile(error, data) {
    if (error) {
        console.log(error);
    } else {

        // Saving loader json into output file
        fs.writeFile('ShareDataAnalysis/outputShares.json', data, 'utf8', function(){console.log('Output file is reset')});
    }
}
})


app.listen(5000);
