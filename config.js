'use strict';

let CONFIG = {
    DB:{
        LOGIN:'admin',
        PASSWORD:'passw0rd',
        HOST:'localhost',
        PORT:'27017',
        BASENAME:'myDatabase'
    }
}

CONFIG = Object.freeze(CONFIG);

module.exports = CONFIG;