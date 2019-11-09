'use strict'

const express = require('express')
const app = express()
const port = 80;

app.use(express.static('css'))

const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://paredros-db:27017'
const dbName = 'paredrosCreatorDb'
const collName = 'adventures'

app.get('/getTestAdventure', (req, res) => {
    MongoClient.connect(url, {useNewUrlParser: true})
    .then(client => {
        let db = client.db(dbName)
        let coll = db.collection(collName)
        coll.find({})
        .toArray()
        .then(adventure => {
            client.close()
            res.status(200).send(adventure)
        })
    })
    .catch(err => res.status(400).send('failed: ' + err))
})

app.listen(port, () => {
    console.log('paredros creator running on port ' + port)
})
