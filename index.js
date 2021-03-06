var express = require("express");
var storeViewModel = require("./viewmodel/storeViewModel");
var buyersViewModel = require("./viewmodel/buyersViewModel");
var bankViewModel = require("./viewmodel/bankViewModel");

var productsViewModel = require("./viewmodel/productsViewModel");
var imageViewModel = require("./viewmodel/imageViewModel");
var  app = express();
//set up template engine
app.set("view engine","ejs");

//static files
app.use(express.static('./public'));

//fire viewmodel
app.get("/",function(req,res){
    res.render(__dirname+"/views/todo");

});
storeViewModel(app);
bankViewModel(app);
buyersViewModel(app);
productsViewModel(app);
imageViewModel(app);

//set port
app.listen(8080,function(){
console.log("now listening on port 8080");
});
