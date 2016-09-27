var express = require('express');
var path = require('path');
var app = express();

// configure app

// use middleware

// define the routes

app.use(express.static(path.join(__dirname,'/public')));

app.get('/contactlist',function(req, res){
   console.log('I recieved a GET request'); 
   
   var person1 = {
        name:'Jay',
        email:'jayfartiyal@hotmail.com',
        number:'9886762064'
    };
    var person2 = {
        name:'Preethi',
        email:'preethika@hotmail.com',
        number:'9886762064'
    };
    var person3 = {
        name:'Utkarsh Goel',
        email:'ugoel@hotmail.com',
        number:'9886762064'
    };
    
    var contactList = [person1,person2,person3];
    res.json(contactList);
});

// start the server

var port = process.env.PORT || 8080;
app.listen(port,function(err){
    if(err != null)
        console.log('Error in starting server at port : ',port);
    else
        console.log('Successfully started server at port : ',port);
});