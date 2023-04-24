var express = require("express");
var path = require("path");
var morgan = require("morgan");
var cors = require("cors")
var fs = require("fs");
var app = express();

let propertiesReader = require("properties-reader");
let propertiesPath = path.resolve(__dirname, "conf/db.properties");
let properties = propertiesReader(propertiesPath);
let dbPprefix = properties.get("db.prefix");

let dbUsername = encodeURIComponent(properties.get("db.user"));
let dbPwd = encodeURIComponent(properties.get("db.pwd"));
let dbName = properties.get("db.dbName");
let dbUrl = properties.get("db.dbUrl");
let dbParams = properties.get("db.params");
const uri = dbPprefix + dbUsername + ":" + dbPwd + dbUrl + dbParams;

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
let db = client.db(dbName);

app.set("json spaces", 3);
app.use(morgan("short"));
app.use(cors());
app.use(express.json()); 


app.param("collectionName", function (req, res, next, collectionName) {
  req.collection = db.collection(collectionName);
  return next();
});

// collection of data from mongodb
app.get("/collections/:collectionName", function (req, res, next) {
  req.collection.find({}).toArray(function (err, results) {
    if (err) {
      return next(err);
    }
    res.send(results);
  });
});



// // (posting a new user created )
// app.post("/collections/:collectionName", function (req, res, next) {

//   // req.body.id = new ObjectId();
//   req.collection.insertOne(req.body, function (err, results) {
//     if (err) {
//       return next(err);
//     }
//     res.send(results);
//   });
// });

//access tho the images on github (creating a diretory)
var staticPath = path.join(__dirname, "image");
app.use("/image", express.static(staticPath));

// port where serve is running
const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("App started on port: " + port);
});
