const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string
const url =
  "mongodb+srv://sahith:saisahith07@cluster0.e5sqv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url);
