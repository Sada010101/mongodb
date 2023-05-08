var express = require('express');
var router = express.Router();

const MongoClient = require("mongodb").MongoClient;
   
const url = "mongodb://127.0.0.1:27017/";
const mongoClient = new MongoClient(url);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/toMongo", function(req,res){
 
async function run() {
    try {
        await mongoClient.connect();
        const db = mongoClient.db("clothes");
        const collection = db.collection("clothesInfo");
        const info = {brand: req.query.brand, size: req.query.size, color: req.query.color};
        const result = await collection.insertOne(info);
        console.log(result);
        console.log(info);
    }catch(err) {
        console.log(err);
    } finally {
        await mongoClient.close();
    }
}
run().catch(console.error);

console.log(req.query.brand, req.query.size);
console.log(req.query.color);
res.render("clothes.hbs", {})
})


module.exports = router;
