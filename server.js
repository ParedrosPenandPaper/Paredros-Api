'use strict'

// configure express server
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000;
app.use(express.json())
app.use(express.static('public'))
app.use(cors({ credentials: true }))

// configure mongodb client
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://paredros-db:27017'
const dbName = 'paredros'
const collName = 'adventures'

// import local test data
const testAdventure = require('./data/testAdventure.js')

// dummy base route
app.get('/', (req, res) => {
  res.setHeader('Set-Cookie', 'api-reached=yisss')
  res.status(200).send('your reached paredros api')
})

///////////////////////////////////////////////////
// ADVENTURE API ENTPOINTS
///////////////////////////////////////////////////

// read test-adventure
app.get('/adventures/testAdventure', (req, res) => {
  console.log('test-adventure requested')
  if (testAdventure !== undefined && testAdventure !== null) {
    console.log(`responding with test-adventure, id "${testAdventure._id}", title "${testAdventure.meta.title}"`)
    res.status(200).json(testAdventure)
  }
  else {
    console.log('failed to retrieve a test-adventure')
    res.status(500).send('no test-adventure available')
  }
})

// create single adventure
app.post('/adventures/', (req, res) => {
  const adventure = res.body
  console.log(`trying to store adventure with id "${adventure._id}" and title "${adventure.meta.title}"`)

  MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(client => {
      client
        .db(dbName)
        .collection(collName)

        .insertOne(req.body)

          .then(id => {
            console.log(`successfully stored adventure "${id} in db"`)
            res.status(200).send()
          })

          .catch(error => {
            console.log(error)
            res.send(`unable to store adventure with id "${adventure._id}" and title "${adventure.meta.title}" in db: ${error}`)
          })

          .finally(() => client.close())
    })
    .catch(err => res.status(500).send('could not connect to db: ' + err))
})

// read single adventure
app.get('/adventures/:adventureId', (req, res) => {
  MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(client => {
      client
        .db(dbName)
        .collection(collName)

        .findOne( {objectID: req.params.adventureId} )

          .then(adventure => {
            console.log(`successfully retrieved adventure with id "${req.params.adventureId}" and title "${adventure.meta.title}" from db`)
            res.status(200).json(adventure)
          })

          .catch(error => res.status(404).send(`adventure with id ${req.params.adventureId} does not exist: ${error}`))

          .finally(() => client.close())
    })
    .catch(err => res.status(500).send('could not connect to db: ' + err))
})

// update single adventure
app.patch('/adventures/:adventureId', (req, res) => {
  const adventure = res.body
  console.log(`trying to update adventure with id "${req.params.adventureId}" and title "${adventure.meta.title}"`)

  MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(client => {
      client
        .db(dbName)
        .collection(collName)

        .replaceOne( {_id: req.params.adventureId}, adventure )

          .then(id => {
            console.log(`successfully updated adventure with id "${id} in db"`)
            res.status(200).send()
          })

          .catch(err => {
            console.log(error)
            res.send(`unable to update adventure with id "${adventure._id}" and title "${adventure.meta.title}" in db: ${error}`)
          })

          .finally(() => client.close())
    })
    .catch(err => res.status(500).send('could not connect to db: ' + err))
})

// delete single adventure
app.delete('/adventures/:adventureId', (req, res) => {
  MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(client => {
      client
        .db(dbName)
        .collection(collName)

        .deleteOne( {_id: req.params.adventureId} )

          .then(id => {
            console.log(`successfully deleted adventure with id "${id}" from db"`)
            res.status(200).send()
          })

          .catch(err => {
            console.log(error)
            res.send(`unable to delete adventure with id "${req.params.adventureId}" from in db: ${error}`)
          })

          .finally(() => client.close())
    })
    .catch(err => res.status(500).send('could not connect to db: ' + err))
})

app.listen(port, () => {
  console.log('paredros api running on port ' + port)
})
