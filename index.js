const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();


const app = express();


app.use(cors());
app.use(bodyParser.json());

const dbUser = process.env.DB_USER;
const pass = process.env.DB_PASS;

const uri = process.env.DB_PATH;

let client = new MongoClient(uri, { useNewUrlParser: true ,  useUnifiedTopology: true  });
const users = ["Joso", 'Moso', 'Foso', 'Kaso', 'Maso', 'Jeso', 'Heso'];
// client.connect(err => err ? console.log("Db connection err" ,err) : console.log("Connected with database"))
// app.get('/' , (req,res) => res.send("Hello world"))
app.get('/products', (req, res)=>{
     const client = new MongoClient(uri, { useNewUrlParser: true });
     console.log('product Called')
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.find().toArray((err, documents) =>{
        console.log('Successfully Loaded', documents);
        if(err){
            console.log(err)
            res.status(500).send({message:err});
        }

        else{
            res.send(documents);
        }

        })
    //    client.close();
      });   
 
})

app.get('/users/:key', (req, res)=>{
    const key = req.params.key;
    
    console.log(req.query.sort);
    const name = users[id];
    res.send({id, name});
})
 
//post

app.post('/addProduct', (req, res) => { 
    console.log('addProduct')
    const client = new MongoClient(uri, { useNewUrlParser: true }); 
  const product = req.body;
  console.log('product', product)
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.insertOne(product, (err, result) =>{
        console.log('successfully inserted', result);
        if(err){
            console.log(err)
            res.status(500).send({message:err});
        }

        else{
            res.send(result.ops[0]);
        }

        })
        // client.close();
      }); 
      
})
const port = process.env.PORT || 5000;
console.log(port)
app.listen(port, () => console.log('Listing to the port 5000'));