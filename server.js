var express=require('express');
var bodyParser=require('body-parser');
var morgan=require('morgan');
var mongoose=require('mongoose');
var config=require('./config');

var app=express();

var port=process.env.PORT || 8080;
mongoose.connect(config.database);
app.set('superSecret',config.secret);
app.set('port',port);

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(morgan('dev'));
var router=require('./app/routes/router');
app.use('/',router);

app.listen(port,()=>{
    console.log("Magic happens at port "+port);
});