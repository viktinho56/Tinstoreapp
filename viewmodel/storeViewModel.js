
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended:false});
var mongoose =require("mongoose");
mongoose.connect('mongodb://tinsoft:Hidemyass2@ds030500.mlab.com:30500/tinstore');
var storeSchema = new mongoose.Schema({
    storename:String,
    storedescription:String,
    logo:String,
    email:String,
    number:Number,
    address:String,
    state:String,
    country:String,
    balance:Number,
    status:String
    });
    
var  Todo = mongoose.model('Stores',storeSchema); 
 /*var itemOne = Todo({storename:"SPL Stores",
                    storedescription:"We sellgood quality clothes",
                    logo:"",
                    email:"spl@gmail.com",
                    number:09065345678,
                    address:"No 16 odoona complex ibadan",
                    state:"oyo",
                    country:"Nigeria",
                    balance:9000,
                    status:"active"}).save(function(err){
            if (err) throw err;
             console.log('store saved');
}); */
module.exports = function (app) {
    //show all stores
    app.get("/api/stores",function(req,res){
        Todo.find({},function(err,data){
            if (err) throw err;
            res.send({store:data});
console.log({store:data});
        })
    
    }); 
//show a single store /search for store
    app.get("/api/stores/:storename",function(req,res){
        Todo.find({storename:req.params.storename.replace(/\-/g," ")},function(err,data){
            if (err) throw err;
            res.send({store:data});
//console.log({storename:req.params.name});
        })
    
    }); 
//create a store
    app.post("/api/stores/",urlencodedParser,function(req,res){
       // data.push(req.body);
       // res.json(data);
        Todo(req.body).save(function(err,data){
            if (err) throw err;
            res.json(data);
          //  res.render("todo",{todos:data});
            console.log('item saved');
            });
       
       // console.log({todos:req.body});
    }); 
// delete a store
    app.delete("/api/stores/:storename",function(req,res){
        Todo.find({_id:req.params.storename.replace(/\-/g," ")}).remove(function(err,data){

            if (err) throw err;
            res.json(data)
            
            
            })
        });

        //update
    app.put("/api/stores/:storeid",urlencodedParser,function(req,res){
            Todo.findById(req.params.storeid.replace(/\-/g," "),function(err,data){
    
                if (err) throw err;
                data.storename = req.body.storename;
                data.storedescription = req.body.storedescription;
                data.logo = req.body.logo;
                data.email = req.body.email;
                data.number = req.body.number;
                data.address = req.body.address;
                data.state = req.body.state;
                data.country = req.body.country;
                data.balance = req.body.balance;
                data.status = req.body.status;
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