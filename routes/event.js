var express = require('express');
var app = express.Router();
var CONFIG = require('../config')
const crypto = require('crypto');       // модуль HASH-ирования паролей
var EventModel = require('../models/EventModel');

var eventM = new EventModel();

/**
 * вывод всех объектов коллекции
 */
app.get('/', (request, response) => {   // http://localhost:3000/event
    eventM.getAllRows({}, 0, 100, 'ASC', 1, function (result, err) {
        response.json(result);
    });
    //       response.status(200).send('element created: ' + result);
});
/**
 * получает строки базы по критерию
 * ввод как /name
 */
app.get('/:id', (request, response) => {  // http://localhost:3000/event/6022e7ce6e4e4640dc29ab2d
    console.log({_id: request.params.id});
    eventM.getOneRowById(request.params.id, function (result) {
        response.json(result);
    });
//    response.status(200).send('get info: ' + request.params.id);
});

// app.get('/:id', (request, response) => {  // http://localhost:3000/event/6022e7ce6e4e4640dc29ab2d
//     eventM.getOneRow({
//         _id: ObjectId(request.params.id)
//     }, function(result, err){
//         response.json(result);
//     });
// });



app.post('/', (request, response) =>{ // http://localhost:3000/event, создание нового события
    eventM.create(request.body.title, request.body.slogan, request.body.imgsrc, request.body.content,//request - данные полученные
        // методом post, create - вызывается, обЪявляется в классе EventModel - из директории models
        function (result) {//передаем в callback функцию, result - результат выполнения true/false
        if(result)
            response.status(200).send('one row created');
        else
            response.status(200).send('not created');
    });
});















/**
 * принимает post запрос на добавление строки в коллекцию с тремя параметрами
 * в виде /login,email,password
 */
// app.post('/:id', (request, response) => {
//     var re = /\s*,\s*/;                                                         // ищет пробелы до и после ','
//     var arrayTemp = request.params.id.split(re);                                // запишим строку в виде массива используя разделитель
//     if (arrayTemp.length != 3)
//         response.status(200).send('Передаваемые параметры не соответствуют требуемым');
//
//     var container = {                                                           // запишим данные как объект
//         id: Date.now(),
//         login: arrayTemp[0],
//         email: arrayTemp[1],
//         password: crypto.createHash('sha256').update(arrayTemp[2]).digest('base64')
//     }
//     eventM.getIdRow({email: container.email}, function (resId) {
//         if (resId == null) {
//             basic.insertOneRow(container, function (result) {
//                 if (result) {
//                     response.status(200).send('element created');
//                 } else {
//                     response.status(200).send('element no created');
//                 }
//             })
//         } else {
//             response.status(200).send('Пользователь уже существует');
//         }
//     })
// //    response.status(200).send('element created');
// });
/**
 * обновляет строку пароля заданного по login & email
 * принимает параметры как /login,email,oldPassword,newPassword
 * перед заменой производится сверка oldPassword с базой
 */
// app.put('/:id', (request, response) => {
//     var re = /\s*,\s*/;                                                         // ищет пробелы до и после ','
//     var arrayTemp = request.params.id.split(re);                                // запишим строку в виде массива используя разделитель
//     if (arrayTemp.length != 4)
//         response.status(200).send('Передаваемые параметры не соответствуют требуемым');
//
//     var data = {                                                                // передаваемые параметры для поиска строки
//         login: arrayTemp[0],
//         email: arrayTemp[1],
//         password: crypto.createHash('sha256').update(arrayTemp[2]).digest('base64')
//     }
//     var datanew = {                                                             // передаваемые данные для замены
//         password: crypto.createHash('sha256').update(arrayTemp[3]).digest('base64')
//     }
//     eventM.getOneRow(data, function (rezult) {                            // сперва произведем поиск строки по заданным критериям
//         var pass = null;
//         rezult.forEach(function (item, key) {
//             pass = item.password;
//         })
//         if (pass == data.password) {                                              // и если строка найдена и пароли базы и введенного соответствуют
//             basic.updateOneRow(data, datanew, function (resId) {         // тогда произведем обновление строки
//                 if (resId != null) {
//                     response.status(200).send('one row updated: ' + request.params.id);
//                 } else {
//                     response.status(200).send('one row error updated');
//                 }
//             })
//         } else {
//             response.status(200).send('Пользователь не найден');
//         }
//     })
//
//     //   response.status(200).send('one row updated: ' + request.params.id);
// });













app.put('/:id', (request, response) => {
    var edited_item = {
        title : request.body.title,
        slogan : request.body.slogan,
        content : request.body.content
    };
    eventM.updateOneRowById2(request.params.id, edited_item,function (result) {//передаем в callback функцию, result - результат выполнения true/false
        if(result)
            response.status(200).send('one row created');
        else
            response.status(200).send('not created');
    });
});


/**
 * удаляет пользователя по его email
 * параметр передается как /email
 */
app.delete('/:id', (request, response) => {
    eventM.deleteRowById(request.params.id, function (result, err) {
        if (result == true)
            response.status(200).send('one row deleted: ' + request.params.email);
        else
            response.status(200).send('one row deleted: Error ' + request.params.email);
    })

});

module.exports = app;
