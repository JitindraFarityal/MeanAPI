var express = require('express');
var path = require('path');
var mongo = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectId;

var app = express();
var url = "mongodb://jitindrafartiyal-meanapi-3821685:27017/contactlist";

// configure app

// use middleware



// define the routes

app.use(express.static(path.join(__dirname,'/public')));
app.use(bodyParser.json());


app.get('/contactlist',function(req, res){
    console.log('I recieved a GET request'); 
    var result = [];

    mongo.connect(url,function(err,db){
        if(err != null)
            console.log('Error in connecting to database');
        else
        {
            console.log('Successfully connected to database');
            var cursor = db.collection('contacts').find();
            
            cursor.forEach(function(doc,err){
                if(err != null)
                    console.log('Unable to fetch data');
                else    
                    result.push(doc);    
            },function(){
                res.json(result);
            });
        }
   });
});

app.post('/contactlist',function(req, res){
    console.log('Adding user contact details : ',req.body);
    mongo.connect(url,function(err,db){
        if(err != null)
            console.log('Error in connecting to database');
        else
        {
            console.log('Successfully connected to database');
            db.collection('contacts').insert(req.body,function(err,doc){
                if(err != null)
                    console.log('Error in inserting database');
                else
                {
                    console.log('Successfully added contact details');
                     res.json(req.body);
                }     
            });
        }
    });
});

app.delete('/contactlist/:id',function(req, res){
    var id = req.params.id;
    console.log('Removing user data of Object Id : ',id);
    mongo.connect(url,function(err,db){
        if(err != null)
            console.log('Error in connecting to database');
        else
        {
            console.log('Successfully connected to database');
            db.collection('contacts').remove({_id:ObjectId(id)},function(err,doc){
                 if(err != null)
                    console.log('Error in deleting from the database');
                else
                {
                    console.log('Successfully deleted the data from the database')    
                    res.json(doc);
                }        
            });
        }
    });
});

app.get('/contactlist/:id',function(req, res){
    var id = req.params.id;
    console.log('Finding the user with id : ',id);
    mongo.connect(url,function(err,db){
        if(err != null)
            console.log('Error in connecting to database');
        else
        {
            console.log('Successfully connected to database');
            db.collection('contacts').findOne({_id:ObjectId(id)},function(err,doc){
                if(err != null)
                    console.log('No such element present');
                else
                {
                    console.log('Element found ',doc);
                    res.json(doc);
                }
            });
        }
    });
});

app.put('/contactlist/:id',function(req, res){
    var id = req.params.id;
    console.log('Got request for updation of user id :',id);
    mongo.connect(url,function(err,db){
        if(err != null)
            console.log('Error in connecting to database');
        else
        {
            console.log('Successfully connected to database');
            db.collection('contacts').updateOne({_id:ObjectId(id)},{$set:{name:req.body.name,email:req.body.email,number:req.body.number}},function(err,doc){
                if(err != null)
                    console.log('Error in updation');
                else
                {
                    console.log('Successfully updated the element');
                    res.json(doc);
                }
            });
        }   
    });
});

// start the server

var port = process.env.PORT || 8080;
app.listen(port,function(err){
    if(err != null)
        console.log('Error in starting server at port : ',port);
    else
        console.log('Successfully started server at port : ',port);
});