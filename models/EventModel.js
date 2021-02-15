const BasicDB = require ('../core/BasicDB');

class EventModel extends BasicDB {
    constructor() {
        super('events');
    }
    create(title1, slogan, imgsrc, content, callback){//обЪявляется функция create
        this.insertOneRow({ title: title1, slogan: slogan, imgsrc: imgsrc,content: content}, function (result) {
            if (typeof  callback === 'function'){
                callback(result);
            }
        });
    }


}

module.exports = EventModel;