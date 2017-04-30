var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var db = require('./db');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());



app.get('/', function(req,res){
  res.send('hello, lol');
})

app.get('/artists', function(req,res){
  // res.send(artists);
  db.get().collection('artists').find().toArray(function(err, docs){
    if(err){
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(docs);
  })
})

app.get('/artists/:id', function(req, res){
  // res.send('trest');
  db.get().collection('artists').findOne({ _id: ObjectID(req.params.id)}, function(err, doc ){
    if(err){
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(doc);
  })

})

app.post('/artists', function(req, res){
  var artist = {
    name : req.body.name
  };
  db.get().collection('artists').insert(artist, function(err, result){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    res.send(artist);
  })
})

app.put('/artists/:id', function(req, res){
  console.log('lol');
  db.get().collection('artists').updateOne(
    { _id: ObjectID(req.params.id) },
    { name: req.body.name },
    // console.log(req.body.name);
    function(err, result){
      if (err){
        console.log(err);
        return res.sendStatus(500)
      }
      res.sendStatus(200);
    }
  )
})

app.delete('/artists/:id', function(req, res){
  db.get().collection('artists').deleteOne(
    { _id: ObjectID(req.params.id)},

    function(err,result){
      if(err){
        return res,sendStatus(500);
      }
      res.sendStatus(200);
    }
  )
})



db.connect('mongodb://localhost:27017/myapi', function(err){
  if (err){
    return console.log(err);

  }
  app.listen(3015, function (){
    console.log("API lol");
  })

})
