const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
const { MongoClient } = require("mongodb");

const HOST='localhost'
const PORT=8000
const uri = 'mongodb://localhost:27017';

DATA=  [
    {
        "id" : "1", 
        "name" : "datapackage-test-1",
        "title" : "Datapackage Test One",
        "licenses" : [],
        "sources" : [],
        "resources": [],
    }
]
const wrapDB = async (operation) => {
    try {
        const client = await MongoClient.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        const db = client.db('openData');
        operation(db);         
    } catch(error) {
        res.status(500).send("Wrap Something went wrong")
    }
}

function getDataPackage(name) {
    return(DATA[0]);
}
app.use(express.json())
app.listen(PORT, ()=>{
    console.log('listening on port ', PORT)
})

app.get('/', (req,resp) => {
    resp.send('open dataset: Hello')
})

app.get('/datapackage/:name',(req,res) => {
    wrapDB(async (db) => {
        const packageName = req.params.name;
        const dp = await db
            .collection('datapackages')
            .findOne({name : packageName});
        console.log(dp)

        if(dp == null) {res.status(200).send(dp)}  
        else {res.status(200).send(dp);}
    })
})

app.post('/datapackage',(req,res) => {
    wrapDB(async (db) => {

        console.log(req.body)
        const dp = await db
            .collection('datapackages')
            .insertOne(req.body);
        res.status(200).json(req.body)


        // if(dp == null) {res.status(200).send(dp)}  
        // else {res.status(200).send(dp);}
    })
})