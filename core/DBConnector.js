"use strict"
const CONFIG = require ('../config');

const MongoClient = require('mongodb');

class DBConnector {
    static execute(callback) {
        const connectionString = "mongodb://" + CONFIG.DB.LOGIN + ":" + CONFIG.DB.PASSWORD + "@" + CONFIG.DB.HOST + ":" + CONFIG.DB.PORT;
        MongoClient.connect(connectionString, {useUnifiedTopology: true}, function (err, connector) {
            console.log("Connection created");
            if (err) throw err;
            if (typeof callback === 'function') {
                callback(connector);
            }
        })
    }
}
module.exports = DBConnector;


/*
const CONGIG = require("../config");
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const colors = require('colors');

class DBConnector {

    static openDB(name, typeRequest, data, rename, callback) {

        var connectionString = "mongodb://" + CONGIG.DB.LOGIN + ":" + CONGIG.DB.PASSWORD + "@" + CONGIG.DB.HOST + ":" + CONGIG.DB.PORT;

        MongoClient.connect(connectionString, {useUnifiedTopology: true}, function (err, connector) {
            console.log(colors.blue("Connection created"));

            var basaDB = connector.db(CONGIG.DB.BASENAME);
            var colBaseDB = basaDB.collection(CONGIG.DB.BASENAME);
            switch (typeRequest){
                case 'createCollection': {                                    // создать коллекцию
                    basaDB.createCollection(name, function (err, result) {
                        connector.close();
                        console.log(colors.blue("Connection close"));
                        if (err) callback("База не создана");
                        else callback('База создана');
                    });
                    break;
                }
                case 'listCollections': {
                    basaDB.listCollections().toArray(function (err, collInfo){
                        connector.close();
                        console.log(colors.blue("Connection close"));
                        if (err) callback("База не создана");
                        else callback(collInfo);
                    })
                    break;
                }
                case 'renameCollection': {
                    basaDB.collection(name).rename(rename, function (err, result){
                        connector.close();
                        console.log(colors.blue("Connection close"));
                        if (result){
                            callback('Коллекция переименована');
                        } else {
                            callback('Коллекция переименована');
                        }
                    })
                    break;
                }
                case 'dropCollection': {
                    colBaseDB.collection(name).drop(function (err, result){
                        connector.close();
                        console.log(colors.blue("Connection close"));
                        if (result){
                            callback('Коллекция удалена');
                        } else {
                            callback('Ошибка удаления коллекции');
                        }
                    });
                    break;
                }
                case 'insertOneCollection': {
                        colBaseDB.insertOne(data, function (err, result) {
                            connector.close();
                            console.log(colors.blue("Connection close"));
                            if (result) {
                                callback('Пользователь добавлен');
                            } else {
                                callback('Ошибка добавления пользователя');
                            }
                        });
                    break;
                }
                case 'findAllCollection': {
                    colBaseDB.find({}).toArray( function (err, result){
                        connector.close();
                        console.log(colors.blue("Connection close"));
                        if (result) {
                            callback(result);
                        } else {
                            callback('Ошибка поиска');
                        }
                    })
                    break;
                }
                case 'findOneCollection': {
                    colBaseDB.findOne(data,function (err, result){
                        connector.close();
                        console.log(colors.blue("Connection close"));
                        if (result) {
                            callback(result);
                        } else {
                            callback('Ошибка поиска');
                        }
                    })
                    break;
                }
                case 'deleteOneCollection': {
                    colBaseDB.deleteOne(data, function (err, result){
                        connector.close();
                        console.log(colors.blue("Connection close"));
                        if (result) {
                            callback('Пользователь удален');
                        } else {
                            callback('Ошибка удаления пользователя');
                        }
                    })
                    break;
                }
                case 'updateOneCollection': {

                    break;
                }
                default: {
                    connector.close();
                    console.log(colors.blue("Connection close"));
                    callback("Err");
                    break;
                }
            }
        });
    }
}
module.exports = DBConnector;
*/