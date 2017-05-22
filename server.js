const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const OdjectID = require('mongodb').ObjectID;
const app = express();
app.use(bodyParser.urlencoded({
    express: true
}));

var db;

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
    console.log(__dirname);
    var cursor = db.collection('quotes').find().toArray(function(err, result) {
            console.log(result);
        })
        // console.log(cursor);
});


app.get('/categories', function(req, res) {
    db.collection('categories').find().toArray(function(err, result) {
        if (err) console.log(err);
        else {
            res.send(result)
        }
    });
});


app.get('/operations', function(req, res){
  db.collection('operations').find().toArray(function(err, result){
    if (err) console.log(err);
    else res.send(result);
  });
});


app.get('/operations/:parent', function(req, res) {
    console.log(req.params);
    db.collection('operations').find({
        parent: req.params.parent
    }).toArray(function(err, result) {
        if (err) console.log(err);
        else {
            res.send(result)
        }
    });
});


// app.put('operations/:id', function(req, res) {
//     console.log();
//     db.colection('operations').updateOne({
//         _id: ObjectID(req.params.id)
//     }, function(err, result) {
//         if (err) console.log(err);
//         else res.sendStatus(200);
//     });
// });


app.get('/operations/:parent/:id', function(req, res) {
    db.collection('operations').findOne(function(err, result) {
        if (err) console.log(err);
        else {
            res.send(result)
        }
    });
});



MongoClient.connect('mongodb://localhost:27017/test', function(err, database) {
    if (err) {
        console.log(err);
        return res.sendStatus(500)
    } else {
        db = database;
        app.listen(3000, function() {
            console.log('done');

        })
    }
})
