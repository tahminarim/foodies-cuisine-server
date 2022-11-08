const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//middle ware
app.use(cors());
app.use(express.json());

// mongodb


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7rxnq3x.mongodb.net/?retryWrites=true&w=majority`;
//console.log(uri)


app.get('/',(req,res)=>{
    res.send('Foodies Cuisine server is running')
})

app.listen(port,()=> {
    console.log(`Foodies Cuisine server running on ${port}`)
})