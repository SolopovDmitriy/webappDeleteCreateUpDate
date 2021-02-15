const connectionString = "mongodb://admin:passw0rd@localhost:27017";

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
MongoClient.connect(connectionString,
    { useUnifiedTopology: true },
    function (err, connect) {
        if (err) throw err;
        console.log("Connected");
        var testDB = connect.db('myDatabase');
        /*testDB.createCollection('events', function(err, result){
            if(err)throw err;

            connect.close();
        });*/

        var events = testDB.collection('events');

        var eventsData = [
            {
                title: 'праздник',
                slogan: '12 сентября',
                imgsrc: 'https://www.google.com/imgres?imgurl=https://i.obozrevatel.com/gallery/2020/9/8/programmist-prikol.jpg&imgrefurl=https://www.obozrevatel.com/lady/holidays/s-dnem-programmista-2020-prikolyi-pozdravleniya-kartinki-i-otkryitki.htm&tbnid=A7oRNOrZ6kYTEM&vet=1&docid=5-uh2Q-L3MSUfM&w=720&h=720&hl=ru-RU&source=sh/x/im',
                content:'День программиста'
            },
            // {
            //     title: 'праздник женский день',
            //     slogan: '8 марта',
            //     imgsrc: '',
            //     content:''
            // },
            // {
            //     title: 'праздник был такой',
            //     slogan: '23 февраля',
            //     imgsrc: '',
            //     content:''
            // },
            // {
            //     title: 'День рождения жены',
            //     slogan: '24 мая',
            //     imgsrc: '',
            //     content:''
            // },
            // {
            //     title: 'День независимости Украины',
            //     slogan: '24 августа',
            //     imgsrc: '',
            //     content:''
            // },
            // {
            //     title: 'Новый год',
            //     slogan: '31 декабря',
            //     imgsrc: '',
            //     content:''
            // },
        ]
        // events.insertMany(eventsData, function(err, result) {
        //      if(err)throw err;
        //      if(result) console.log("события добавлены");
        //      connect.close();
        // });
        events.find({}).toArray(function (err, result) {
                if(err)throw err;
                console.log(result);
                connect.close();
        });
    });

