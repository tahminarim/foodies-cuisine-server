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
async function run() {
    try {
        const menuCollection = client.db('foodiesCuisine').collection('allMenu');
        const orderCollection = client.db('foodiesCuisine').collection('ordersList');

        //all menus api for read all menus 
        app.get('/allmenu', async (req, res) => {
            const query = {}
            const cursor = menuCollection.find(query);
            const menus = await cursor.toArray();
            res.send(menus);
        });

        // limit 3 menu
        app.get('/threemenu', async (req, res) => {
            const query = {}
            const cursor = menuCollection.find(query);
            const menus = await cursor.limit(3).toArray();
            res.send(menus);
        });
        // read specifique data
        app.get('/allmenu/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const menu = await menuCollection.findOne(query);
            res.send(menu);
        });
        
        //orders api (get data)
        app.get('/orders', async (req, res) => {
            let query = {};
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = orderCollection.find(query);
            const orders = await cursor.toArray();
            res.send(orders);

        });

        // data create for orders
        app.post('/orders', async (req, res) => {
            const order = req.body;
            const result = orderCollection.insertOne(order);
            res.send(result);

        })




    }
    finally {

    }
}

run().catch(err => console.log(err));


app.get('/', (req, res) => {
    res.send('Foodies Cuisine server is running')
})

app.listen(port, () => {
    console.log(`Foodies Cuisine server running on ${port}`)
})