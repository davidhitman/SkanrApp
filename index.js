let express = require("express");
const { MongoClient} = require("mongodb");
let app = express();
var url = "mongodb+srv://hitimanadavid:David25092@userstables.rxlq3xj.mongodb.net/?retryWrites=true&w=majority";

app.use(express.json());


const client = new MongoClient(url);
let db = client.db("UsersTables");


app.param("collectionName", function (req, res, next, collectionName) {
    req.collection = db.collection(collectionName);
    return next();
  });

app.get("/collections/:collectionName", function (req, res, next) {
  req.collection.find({}).toArray(function (err, results) {
    if (err) {
      return next(err);
    }
      res.send(results);
    });
});

app.set("json spaces", 3);


const port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log("App started on port: " + port);
});
