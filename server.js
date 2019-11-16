'use strict'

const express = require('express')
const cors = require('cors')
const app = express()
const port = 80;

app.use(express.static('public'))
app.use(cors())

const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://paredros-db:27017'
const dbName = 'paredrosCreatorDb'
const collName = 'adventures'

app.get('/', (req, res) => {
    res.setHeader('Set-Cookie', 'api-reached=yisss')
    res.status(200).send('your reached paredros api')
})

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

app.post('/login', (req, res) => {
    res.setHeader('Set-Cookie', 'loggedin=true')
    res.status(200).send()
})

app.listen(port, () => {
    console.log('paredros api running on port ' + port)
})
