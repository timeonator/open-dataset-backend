const express = require('express')
const app = express()
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
const wrapArticleDB = async (operation) => {
    try {
        const client = await MongoClient.connect(uri, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
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

app.listen(PORT, ()=>{
    console.log('listening on port ', PORT)
})

app.get('/', (req,resp) => {
    resp.send('open dataset: Hello')
})

app.get('/datapackage/:name',(req,res) => {
    wrapArticleDB(async (db) => {
        const packageName = req.params.name;
        const dp = await db.collection('datapackages').findOne({name : packageName});

        res.status(200).send(dp);
    });
    // console.log(req)
    // try {
    //     const client = MongoClient.connect(uri, {
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true,
    //     })

    // const db = client.db('openData');
    // const dp = database.collection('datapackages');
    // const query={name:"datapackage-test-2"}
//     const datapackage = dp.findOne(query)
        
// //    var dp = getDataPackage(req.params.name)
//     res.json(datapackage)
    // } catch(error) {
    //     console.log("Error", error)
    //     res.status(500).send("Something went wrong")
    // }
})