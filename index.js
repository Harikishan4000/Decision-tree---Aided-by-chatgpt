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

app.get('/get-share-output-json', (req, res)=>{
  res.sendFile(__dirname+'/ShareDataAnalysis/outputShares.json')
})
app.get('/get-share1-json', (req, res)=>{
  res.sendFile(__dirname+'/ShareDataAnalysis/share1Data.json')
})
app.get('/get-share2-json', (req, res)=>{
  res.sendFile(__dirname+'/ShareDataAnalysis/share2Data.json')
})
app.get('/get-share3-json', (req, res)=>{
  res.sendFile(__dirname+'/ShareDataAnalysis/share3Data.json')
})

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
                 Your only job is to analyse the statements passed which represent certain events and convert the statements into decision tree nodes and return them as a single dimentional array in JSON format. There must be three types of nodes: Root node, Decision node and Cost node. Root node is the top-most node. Decision nodes are those that lead to other events taking place. They do not have probabilities attached to them. Cost nodes are the nodes whose children have certain probabilities associated with them. The bottom-most are the nodes that do not have any children.They can be either have positive or negative values. Any node can have only one parent node. Any node can have multiple children nodes. Create the output in json format with fields: id: root node is 0 and increment the id for each new node. name: Mentions the name of the node. type: Mentions if it is \"cost\" node, \"decision\" node, or \"root\" node. level: Mentions the level at which the node is present with respect to the root node. payoff: Mentions the payoff if it is a cost node. probability: Mentions the probability if it is a decision node. parent: id of the parent of the current node. children: which consists of the array of the ids of the children of the current node. Return an empty array if it has no children. Note that while creating the JSON data: 1. Make sure all characters are lowercase 2. First node is always a Root node, that is, it's type is "root". 3. If a node has a parent node, it's id should be present in the children array of only that parent and nothing in no other children array. 4. Do not give any extra information, just give a single dimensional JSON format as the response. This is very important and should be followed at all times. 5. Make sure all the fields of the JSON exist at all times. 6. Name the nodes appropriately. Make sure the names do not exceed 15 characters 7. If there is not payoff given with the node, keep it as null. 8. If there is no probability given with the node, keep it as null. 9. Convert all probabilities to decimal values. 10. Make sure the children array is filled if the node has children, or if any other node refers to it as a parent. 11. If the node's children have probability, always make the current node a cost node. 12. If the node's children array is empty, consider it to be an end node with value. 13. Make sure that this entire JSON has only a single dimensional unnamed array to encapsulate the entire rest of the data. 14. If no input is provided or insufficient input is provided, respond with an empty array. This is extremely inportant and should be followed at all times. 15. All nodes except the root node has a parent. 16. If even one child of a given node has a probability, then make sure all the children of the given node have probability.
                 ###
                 /n/n
                 ${prompt}`
            ,
      max_tokens: 2000,
      temperature: 0.3,
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
  const dur= req.body.duration;
  console.log(req.body);
  let i=0;
  if(prompt1!="undefined") i++;
  if(prompt2!="undefined") i++;
  if(prompt3!="undefined") i++;
  fs.writeFile('./output.json', '', 'utf8', function(){console.log('Cleared final output file')})


console.log("Number of shares: ", i);
  var url1 = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol='+prompt1+'&apikey=E2ID69B7IB618CCM';

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


  var url2 = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol='+prompt2+'&apikey=E2ID69B7IB618CCM';

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
        // console.log("Share2: ", myData);
        // data is successfully parsed as a JSON object:
        fs.writeFile('./ShareDataAnalysis/share2Data.json',myData.toString(), function printed(){ console.log("ShareData2 is printed.")});
      }
  });


  var url3 = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol='+prompt3+'&apikey=E2ID69B7IB618CCM';


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
        fs.writeFile('./ShareDataAnalysis/share3Data.json',myData.toString(), function printed(){console.log("ShareData3 is printed.")});
      }

  });

    //Copying json from loader to output file

    fs.writeFile('./ShareDataAnalysis/outputShares.json', '', 'utf8', function(){console.log('. . .')})

    fs.readFile('./ShareDataAnalysis/outputSharesLoader.json', 'utf8', readingFile);



  
function readingFile(error, data) {
    if (error) {
        console.log(error);
    } else {
        // Saving loader json into output file
        fs.writeFile('./ShareDataAnalysis/outputShares.json', data, 'utf8', function(){console.log('Output file is reset')});
    }
}
})


app.listen(5000);


app.post('/updateoutputshare', middle, async(req, res)=>{
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  fs.writeFile('./ShareDataAnalysis/outputShares.json', '', 'utf8', function(){console.log('. . .')})

  // console.log(req.body)
      fs.writeFile('./ShareDataAnalysis/outputShares.json', JSON.stringify(req.body), 'utf8', function(){console.log('Names updated')});

})