
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended:false});
var mongoose =require("mongoose");
mongoose.connect('mongodb://uuucmrm9fp3tqciemmgr:O4wSkGwPbhhFbxFesQuP@bnqwzhcnme3b8l9-mongodb.services.clever-cloud.com:27017/bnqwzhcnme3b8l9');
var imageSchema = new mongoose.Schema({
    url:String,
    productid:String,
    storeid:String,
    storename:String
    
   
    });
   
var  Todo = mongoose.model('Images',imageSchema); 
/*var itemOne = Todo({
                    url:"C:\Users\Toshiba\Desktop\folder\background\boot.jpg",
                    storename:"SPL Stores",
                    productid:"5c50b3d5c9931a0850761d94",
                    storeid:"5c50b3d5c9931a0850761d94"
                
                    }).save(function(err){
            if (err) throw err;
             console.log('image saved');
});*/
module.exports = function (app) {
    //show all stores
    app.get("/api/images",function(req,res){
        Todo.find({},function(err,data){
            if (err) throw err;
            res.send({image:data});
            console.log({image:data});
        })
    
    }); 
//show a single store /search for store
    app.get("/api/images/:productid",function(req,res){
        Todo.find({productid:req.params.productid.replace(/\-/g," ")},function(err,data){
            if (err) throw err;
            res.send({image:data});
//console.log({storename:req.params.name});
        })
    
    }); 
//create a store
    app.post("/api/images/",urlencodedParser,function(req,res){
       // data.push(req.body);
       // res.json(data);
        Todo(req.body).save(function(err,data){
            if (err) throw err;
            res.json(data);
          //  res.render("todo",{todos:data});
            console.log('image saved');
            });
       
       // console.log({todos:req.body});
    }); 
// delete a store
    app.delete("/api/images/:productid",function(req,res){
        Todo.find({productid:req.params.productid.replace(/\-/g," ")}).remove(function(err,data){

            if (err) throw err;
            res.json(data)
            
            
            })
        });

        //update a store
    app.put("/api/images/:imageid",urlencodedParser,function(req,res){
            Todo.findById(req.params.imageid.replace(/\-/g," "),function(err,data){
    
                if (err) throw err;
                //data.storename = req.body.storename;
               // data.storeid = req.body.storedescription;
                data.url = req.body.url;
               
                data.save(function(err) {
                if (err)
                res.send(err);
                res.json(data);
            
            });
               
                
                
                });
            });
            
       //
      //  res.render("todo",{todos:data});
    
}
