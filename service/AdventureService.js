'use strict';

const testAdventure = require('../data/testAdventure.js')
var utils = require('../utils/writer.js');

const ObjectId = require('mongodb').ObjectId
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://paredros-db:27017'
const dbName = 'paredros'
const collName = 'adventures'

/**
 * Gets all Adventures
 * Gets all user relatet Adventures from the list.
 *
 * no response value expected for this operation
 **/
exports.adventuresGET = function() {
  return new Promise(function(resolve, reject) {
    console.log("trying to get all adventures")
    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(client => {
      client
        .db(dbName)
        .collection(collName)
        .find({}).toArray()
          .then(adventures => {
            console.log('successfully retrieved all adventures from db')
            resolve(adventures)
          })
          .catch(error => {
            console.log('failed to retrieve all adventures: ' + error)
            reject(error)
          })
          .finally(() => {
            client.close()
          })
    })
    .catch(err => reject(utils.respondWithCode(500,{"error":'could not connect to db: ' + err})))
  });
}

/**
 * Creates a Adventure
 * Adds a Adventure to the list.
 *
 * no response value expected for this operation
 **/
exports.adventuresPOST = function(body) {
  return new Promise(function(resolve, reject) {
    var adventure = body;
    console.log(`trying to store adventure with id "${adventure._id}" and title "${adventure.meta.title}"`)
    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
      .then(client => {
        client
          .db(dbName)
          .collection(collName)
  
          .insertOne(adventure)
  
            .then(id => {
              console.log(`successfully stored adventure "${id} in db"`)
              resolve(utils.respondWithCode(201,adventure))
            })
  
            .catch(error => {
              console.log(error)
              reject(utils.respondWithCode(500,`unable to store adventure with id "${adventure._id}" and title "${adventure.meta.title}" in db: ${error}`))
            })
  
            .finally(() => client.close())
      })
      .catch(err => reject(utils.respondWithCode(500,{"error":'could not connect to db: ' + err})))
    });
}

/**
 * Delets all Adenvtures
 * Delets all user relatet Adventure from the List.
 *
 * no response value expected for this operation
 **/
exports.adventuresDELETE = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}



/**
 * Gets adventure by id
 * Gets adventure from list by id
 *
 * adventureId Integer 
 * no response value expected for this operation
 **/
exports.adventuresAdventureIdGET = function(adventureId) {
  return new Promise(function(resolve, reject) {
    console.log("trying to get adventure with id: " + adventureId)
    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(client => {
      client
        .db(dbName)
        .collection(collName)
        .findOne(ObjectId(adventureId))

          .then(adventure => {
            console.log(`successfully retrieved adventure with id "${adventureId}" and title "${adventure.meta.title}" from db`)
            resolve(utils.respondWithCode(200,adventure))
          })

          .catch(error => reject(utils.respondWithCode(404,`adventure with id ${adventureId} does not exist: ${error}`)))
          .finally(() => client.close())
    })
    .catch(err => reject(utils.respondWithCode(500,{"error":'could not connect to db: ' + err})))
  });
}

/**
 * Updates adventure
 * Updates adventure by id
 *
 * adventureId Integer 
 * no response value expected for this operation
 **/
exports.adventuresAdventureIdPATCH = function(adventureId,body) {
  return new Promise(function(resolve, reject) {
    const adventure = body
    console.log(`trying to update adventure with id "${adventureId}" and title "${adventure.meta.title}"`)

    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
      .then(client => {
        client
          .db(dbName)
          .collection(collName)

          .replaceOne( {_id: adventureId}, adventure )

            .then(id => {
              console.log(`successfully updated adventure with id "${id} in db"`)
              resolve(utils.respondWithCode(200,adventure))
            })

            .catch(err => {
              console.log(error)
              reject(utils.respondWithCode(500,`unable to update adventure with id "${adventure._id}" and title "${adventure.meta.title}" in db: ${error}`))
            })

            .finally(() => client.close())
      })
      .catch(err => reject(utils.respondWithCode(500,{"error":'could not connect to db: ' + err})))
      });
}

/**
 * Delets adventure
 * Delets adventure by id
 *
 * adventureId Integer 
 * no response value expected for this operation
 **/
exports.adventuresAdventureIdDELETE = function(adventureId) {
  return new Promise(function(resolve, reject) {
    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(client => {
      client
        .db(dbName)
        .collection(collName)

        .deleteOne( {_id: adventureId} )

          .then(id => {
            console.log(`successfully deleted adventure with id "${id}" from db"`)
            resolve()
          })

          .catch(err => {
            console.log(error)
            reject(utils.respondWithCode(500,`unable to delete adventure with id "${adventureId}" from in db: ${error}`))
          })

          .finally(() => client.close())
    })
    .catch(err => reject(utils.respondWithCode(500,{"error":'could not connect to db: ' + err})))
  });
}

/**
 * Get test Adventure
 * get a test Adventure for beginners to learn writing stories.
 *
 * no response value expected for this operation
 **/
exports.adventuresTestAdventureGET = function() {
  return new Promise(function(resolve, reject) {
    console.log('test-adventure requested')
    if(testAdventure !== undefined && testAdventure !== null) {
      console.log(`responding with test-adventure, id "${testAdventure._id}", title "${testAdventure.meta.title}"`)
      resolve(utils.respondWithCode(200,testAdventure));
    }
    else {
      console.log('failed to retrieve a test-adventure')
      reject(utils.respondWithCode(504,{'errorcode':'no test-adventure available'}))
    }
  });
}