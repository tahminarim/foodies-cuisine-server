const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//middle ware
app.use(cors());
app.use(express.json());

// mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7rxnq3x.mongodb.net/?retryWrites=true&w=majority`;
//console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


//crud operations
async function run(){
    try{
        const menuCollection = client.db('foodiesCuisine').collection('allMenu');
        
//all menus api for read all menus 
        app.get('/allmenu', async (req, res) => {
            const query = {}
            const cursor = menuCollection.find(query);
            const menus = await cursor.toArray();
            res.send(menus);
        });

    }
    finally{

    }
}

run().catch(err=>console.log(err));


app.get('/',(req,res)=>{
    res.send('Foodies Cuisine server is running')
})

app.listen(port,()=> {
    console.log(`Foodies Cuisine server running on ${port}`)
})