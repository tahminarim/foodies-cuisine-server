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
        const userCollection = client.db('foodiesCuisine').collection('users');
        const orderCollection = client.db('foodiesCuisine').collection('ordersList');
        const reviewsCollection = client.db('foodiesCuisine').collection('reviews');

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
        //reviws
        app.get('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const order = await orderCollection.findOne(query);
            console.log(order);
            res.send(order);

        });

        //all reviws api for read all reviws
        app.get('/reviews', async (req, res) => {
            const query = {}
            const cursor = reviewsCollection.find(query);
            const reviws = await cursor.toArray();
            res.send(reviws);
        });

        // data create for reviws
        app.post('/reviews', async (req, res) => {
            const review = req.body;
            const result = reviewsCollection.insertOne(review);
            res.send(result);

        })

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





        // users get data
        app.get('/users', async (req, res) => {
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
        })

        // data create for users
        app.post('/users', async (req, res) => {
            const user = req.body;
            // console.log(user);
            const result = userCollection.insertOne(user);
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