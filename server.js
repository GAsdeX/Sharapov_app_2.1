const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const OdjectID = require('mongodb').ObjectID;
var upload =require('express-fileupload');


var app = express();
app.use(bodyParser.urlencoded({
    express: true
}));


app.use(upload())

app.use(express.static('node_modules/purecss/build'));
app.use('/public', express.static('public'));
app.use(express.static('node_modules/angular'));
app.use(express.static('node_modules/angular-route'));
app.use(express.static('app'));
app.use(express.static('admin'));

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

app.post('/consultation', function(req, res){
  console.log(req.body);
  db.collection('consultation').insert((err, result) => {
    if (err) throw err;
    else return(result)
  });
})

app.get('/consultation', function(req,res){
  db.collection('consultation').find().toArray(function(err,result){
    if (err) throw err;
    else res.send(result)
  });
})

app.get('/operations/:parent/:_id', function(req,res){
  db.collection('operations').find({
    parent : req.params.parent
  }).toArray(function(err, result) {
    if (err) throw err;
    else res.send(result)
  });
});

app.post('/admin/imageToSlider/:perent', function(req, res){
  // console.log(req);

  if (req.files) {
    console.log(req.files);
    var file = req.files.file;
    var filename = file.name;

    file.mv('./public/img/form-data/' + filename, function(err){
      if (err) throw err;
      else {
        db.collection('categories').find({
          _id : req.params.perent
        }).insert({imgPath : filename})
      }
    })
  }
})

app.post('/admin/imageToCategory', function(req, res){

})

app.post('/admin/imageToOperation', function(req, res){

})

MongoClient.connect('mongodb://localhost:27017/test', function(err, database) {
    if (err) {
        console.log(err);
        return res.sendStatus(500)
    } else {
        db = database;
        app.listen(3001, function() {
            console.log('done');

        })
    }
})
