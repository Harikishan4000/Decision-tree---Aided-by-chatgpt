const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  async function runCompletion () {
    let question=""


    const completion = await openai.createCompletion({
    model: "ada-002",
    prompt: "Your job is to convert the a set of statements which represent certain events into decision tree nodes and convert them into json format. Create a decision tree node for each statement. There must be three types of nodes, decision node and cost node and leaf node.Decision nodes are those that lead to other events taking place. They do not have probabilities attached to them. Cost nodes are the nodes whose children have certain probabilities associated with them. The leaf nodes are the nodes that do not have any children. They always This can be either positive or negative values.  Make sure to create leaf nodes if required.Each node can have only one parent node but a parent can have multiple children nodes. Create the output in json format with fields: \n id: root node is 0 and increment the id for each new node\n name of node: Mentions the name of the node, type of node: Mentions if it is \"cost\", \"decision\", \"root\" or \"leaf\"\n level: Mentions the level at which the node is present with respect to the root node,\n payoff: if it is a cost node, \n probability: if it is a decision node,\n parent: id of the parent of the current node\n children: which consists of the array of the ids of the children of the current node, empty array if it has no children\n\n Note that while creating the json script:\n 1. Make sure all characters are lowercase\n2. The first node is always of type \"root\"\n 3. If a node has a parent, its id should be present in the children array of only that parent and nothing else.\n 4. respond only with the json script and nothing else\n 5. Make sure all the fields of the json exist at all times.\n6. Name the nodes appropriately.\n 7. Don't make new nodes just for the payoffs, add the payoff to the appropriate existing node\n 8. If there is not payoff given with the node, keep it as null.\n 9. If there is no probability given with the node, keep it as null.\n 10.  Convert all probabilities to decimal values.\n 11. Make sure the children array is filled if the node has children, or if any other node refers to it as a parent.\n 12. If the node's children have probability, always make the current node a cost node.\n 13. If the node's children array is empty, make it a leaf type node.\n\n",question,
    max_tokens:100
    });
    console.log(completion.data.choices[0].text);
}

runCompletion();