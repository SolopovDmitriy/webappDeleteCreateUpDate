"use strict"
const CONFIG = require('../config');
const DBConnector = require('./DBConnector');
const ObjectId = require('mongodb').ObjectId;

class BasicDB {
    constructor(collection) {
        var _collectionName = collection;   //validation
        this.getCollectionName = function () {
            return _collectionName;
        }
    }

    /**
     * Получение id строки
     * @param searchPattern     критерий поиска
     * @param callback
     */
    getIdRow(searchPattern = {}, callback) {
        DBConnector.execute(function (conn) {
            var _basa = conn.db(CONFIG.DB.BASENAME);    // ссылка на базу данных
            var curCollection = _basa.collection(this.getCollectionName());
            curCollection.findOne(searchPattern, function (err, row) {
                conn.close();
                console.log('Connection close IdRow');
                //if(err) throw err;
                if (typeof callback === 'function') {
                    if (row) callback(row._id);
                    else callback(null);
                }
            })
        }.bind(this))
    }

    /**
     *  получение строк от min до max
     * @param searchPattern     критерий поиска
     * @param min               минимальное колличество строк выборки
     * @param max               максимальное колличество строк выборки
     * @param order_col         имя столбца по которому сортировать
     * @param sort метод        сортировки возрастание(1)/спадание(-1)
     * @param callback
     */
    getAllRows(searchPattern, min = 0, max = 100, order_col, sort = 'ASC', callback) {
        DBConnector.execute(function (conn) {
            var _basa = conn.db(CONFIG.DB.BASENAME);    // ссылка на базу данных
            var curCollection = _basa.collection(this.getCollectionName());
            if (sort == 'ASC') sort = {order_col: 1};
            else sort = {order_col: -1};

            curCollection.find(searchPattern).sort(sort).limit(max).toArray(function (err, result) {
                conn.close();
                console.log('Connection close AllRows');
                //if(err) throw err;
                if (typeof callback === 'function') {
                    if (result) callback(result);
                    else callback(null);
                }
            })
        }.bind(this))
    }

    /**
     * получение одной строки
     * @param searchPattern     критерий поиска
     * @param callback
     */
    getOneRow(searchPattern, callback) {
        this.getAllRows(searchPattern, 0, 1, 'id', 'ASC', function (oneRow) {

            if (typeof callback === 'function') {
                callback(oneRow);
            }
        })
    }

    getOneRowById(id, callback) {
        DBConnector.execute(function (conn) {
            var _basa = conn.db(CONFIG.DB.BASENAME);    // ссылка на базу данных
            var curCollection = _basa.collection(this.getCollectionName());
            var queryWhat = {_id: ObjectId(id)};
            curCollection.findOne(queryWhat, function (err, result) {
                if (err) throw err;
                conn.close();
                if (result)
                    callback(result);
                else
                    callback(null);
            });
        }.bind(this))
    }


    deleteRowById(id, callback) {
        DBConnector.execute(function (conn) {
            var _basa = conn.db(CONFIG.DB.BASENAME);    // ссылка на базу данных
            var curCollection = _basa.collection(this.getCollectionName());
            var queryWhat = {_id: ObjectId(id)};
            curCollection.deleteOne(queryWhat, function (err, result) {
                if (err) throw err;
                conn.close();
                if (result)
                    callback(result);
                else
                    callback(null);
            });
        }.bind(this))
    }


    /**
     * получить полный список доступных коллекций
     * возвращает список или null
     * @param callback
     */
    getListCollection(callback) {
        DBConnector.execute(function (conn) {
            var _basa = conn.db(CONFIG.DB.BASENAME);    // ссылка на базу данных
            _basa.listCollections().toArray(function (err, row) {
                conn.close();
                console.log('Connection close');
                //if(err) throw err;
                if (typeof callback === 'function') {
                    if (row) {
                        callback(row);
                    } else callback(null);
                }
            })
        }.bind(this))
    }

    /**
     * проверяет, из доступных коллекций, наличие заданной
     * @param searchPattern     имя коллекции передается как 'nameBase'
     * @param callback          возвращает true/false
     */
    getEstablishCollection(searchPattern, callback) {
        this.getListCollection(function (coll) {
            if (typeof callback === 'function') {
                if (coll) {
                    var base = false;
                    coll.forEach(function (item, key) {
                        if (coll[key].name == searchPattern) {
                            base = true;
                            return;
                        }
                    })
                    callback(base);
                } else {
                    callback(false);
                }
            }
        })
    }

    /**
     * переименование коллекции
     * @param nameColl      старое название коллекции
     * @param renameColl    новое название коллекции
     * @param callback      возвращает true/false
     */
    renameCollection(nameColl, renameColl, callback) {
        DBConnector.execute(function (conn) {
            var _basa = conn.db(CONFIG.DB.BASENAME);    // ссылка на базу данных
            _basa.collection(nameColl).rename(renameColl, function (err, res) {
                conn.close();
                console.log('Connection close');
                //if(err) throw err;
                if (typeof callback === 'function') {
                    if (res) {
                        callback(true);
                    } else callback(false);
                }
            })
        }.bind(this))
    }

    /**
     * удалить указанную коллекцию
     * @param searchPattern     имя коллекции как 'nameColl'
     * @param callback          результат выполнения true/false
     */
    dropCollection(searchPattern, callback) {
        DBConnector.execute(function (conn) {
            var _basa = conn.db(CONFIG.DB.BASENAME);    // ссылка на базу данных
            _basa.collection(searchPattern).drop(function (err, res) {
                conn.close();
                console.log('Connection close');
                //if(err) throw err;
                if (typeof callback === 'function') {
                    if (res) {
                        callback(true);
                    } else callback(false);
                }
            })
        }.bind(this))
    }

    /**
     * создает коллекцию
     * @param searchPattern     имя коллекции
     * @param callback          возвращает результат true/false
     */
    createCollection(searchPattern, callback) {
        DBConnector.execute(function (conn) {
            var _basa = conn.db(CONFIG.DB.BASENAME);    // ссылка на базу данных
            _basa.createCollection(searchPattern, function (err, res) {
                conn.close();
                console.log('Connection close');
                //if(err) throw err;
                if (typeof callback === 'function') {
                    if (res) {
                        callback(true);
                    } else callback(false);
                }
            })
        }.bind(this))
    }

    /**
     * добавляет в коллекцию одну строку данных
     * @param dataObject    объект данных как {name:'name',.........}
     * @param callback      возвращает результат выполнения true/false
     */
    insertOneRow(dataObject, callback) {
        DBConnector.execute(function (conn) {
            var _basa = conn.db(CONFIG.DB.BASENAME);    // ссылка на базу данных
            var curCollection = _basa.collection(this.getCollectionName());
            curCollection.insertOne(dataObject, function (err, res) {
                conn.close();
                console.log('Connection close');
                //if(err) throw err;
                if (typeof callback === 'function') {
                    if (res) {
                        callback(true);
                    } else callback(false);
                }
            })
        }.bind(this))
    }

    /**
     * удаляет из коллекции строку по заданному параметру
     * @param searchPattern     параметр поиска {name:'name'}
     * @param callback          результат выполнения true/false
     */
    deleteOneRow(searchPattern, callback) {
        DBConnector.execute(function (conn) {
            var _basa = conn.db(CONFIG.DB.BASENAME);    // ссылка на базу данных
            var curCollection = _basa.collection(this.getCollectionName());
            curCollection.deleteOne(searchPattern, function (err, res) {
                conn.close();
                console.log('Connection close');
                if (typeof callback === 'function') {
                    if (res.deletedCount == 1) {
                        callback(true);
                    } else callback(false);
                }
            })
        }.bind(this))
    }

    /**
     * обновляет заданную строку новыми данными
     * @param myquery       параметры поиска {_id:id,.....}
     * @param newvalues     новые параметры как {name:name,.....}
     * @param callback      результат успешного выполнения true/false
     */
    updateRow(myquery = {}, newvalues = {}, callback) {
        var newquery = {$set: newvalues};
        DBConnector.execute(function (conn) {
            var _basa = conn.db(CONFIG.DB.BASENAME);    // ссылка на базу данных
            var curCollection = _basa.collection(this.getCollectionName());
            curCollection.updateOne(myquery, newquery, function (err, res) {
                conn.close();
                console.log('Connection close updateOneRow');
                if (typeof callback === 'function') {
                    if (res) {
                        callback(true);
                    } else callback(false);
                }
            })
        }.bind(this))
    }

    /**
     * обновляет заданную строку новыми данными с предварительной проверкой на наличие id искомой строки
     * @param myquery       параметры поиска {_id:id,.....}
     * @param newvalues     новые параметры как {name:name,.....}
     * @param callback      результат успешного выполнения {id:(true/false), up:(true/false)}
     */
    updateOneRow(myquery = {}, newvalues = {}, callback) {
        var result = {id: true, up: false}
        this.getIdRow(myquery, function (res) {
            if (res) {
                var idmyquery = {_id: res};
                this.updateRow(idmyquery, newvalues, function (resUp) {
                    if (typeof callback === 'function') {
                        if (resUp) {
                            result.up = true;
                            callback(result);
                        } else callback(result)
                    }
                })
            } else {
                if (typeof callback === 'function') {
                    result.id = false;
                    callback(result);
                }
            }
        }.bind(this))
    }


// var _idDunkan = '6005d669d55e5c206cb56e69';
//
// var queryWhat = {_id:ObjectId(_idDunkan)};

    /*Peoples.updateOne(queryWhat, {
        $set:{
            name:"Дункан МакКлауд мл",
            age:1500,
            gender:'male'
        }
    }, function (err, result) {
        if(err) throw err;
        console.log("Строка была обновлена");

        connector.close();
    });*/


    updateOneRowById2(id, new_event, callback) {
        DBConnector.execute(function (conn) {
            var _basa = conn.db(CONFIG.DB.BASENAME);
            var curCollection = _basa.collection(this.getCollectionName());
            var queryWhat = {_id: ObjectId(id)};
            curCollection.updateOne(queryWhat, {
                $set: new_event
            }, function (err, result) {
                if (err) throw err;
                conn.close();
                if (result)
                    callback(result);
                else
                    callback(null);
            });
        }.bind(this))
    }

}


module.exports = BasicDB;























/*
const DBConnector = require('./DBConnector');

class BasicDB {

    static createCollection(name, callback){
        DBConnector.openDB(name, 'createCollection', ({}), name, function (res){
            callback(res);
        });
    }

    static listCollections(name, callback){
        DBConnector.openDB(name, 'listCollections', ({}), name,function (res){
            callback(res);
        });
    }

    static renameCollection(name, rename, callback){
        DBConnector.openDB(name, 'renameCollection', ({}), rename, function (res){
            callback(res);
        });
    }

    static dropCollection(name, callback){
        DBConnector.openDB(name, 'dropCollection', ({}), name,function (res){
            callback(res);
        });
    }

    static insertOneCollection(name, data, callback){
        DBConnector.openDB(name, 'insertOneCollection', data, name,function (res){
            callback(res);
        });
    }

    static findAllCollection(name, callback){
        DBConnector.openDB(name, 'findAllCollection', ({}), name,function (res){
            callback(res);
        });
    }

    static findOneCollection(name, data,callback){
        DBConnector.openDB(name, 'findOneCollection', data, name,function (res){
            callback(res);
        });
    }


    static deleteOneCollection(name, data, callback){
        DBConnector.openDB(name, 'deleteOneCollection', data, name,function (res){
            callback(res);
        });
    }
    static updateOneCollection(name, callback){
        DBConnector.openDB(name, function (res){
            callback(res);
        });
    }

}

module.exports = BasicDB;
*/