var express=require('express');
var app=express();
var mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/bagroll')
app.use(express.static(__dirname+'/public'));

app.listen(3000);
console.log("server listening port 3000");