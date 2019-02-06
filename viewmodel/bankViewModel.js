
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended:false});
var mongoose =require("mongoose");
mongoose.connect('mongodb://tinsoft:Hidemyass2@ds030500.mlab.com:30500/tinstore');
var bankSchema = new mongoose.Schema({
    storename:String,
    storeid:String,
    bankname:String,
    nuban:String,
    accountname:String
    });
   
var  Todo = mongoose.model('Banks',bankSchema); 
var itemOne = Todo({storename:"SPL Stores",
                    storeid:"5c50b3d5c9931a0850761d94",
                    bankname:"Guaranty Trust Bank",
                    nuban:"0168977375",
                    accountname:"Fadipe victor foluso",
                    }).save(function(err){
            if (err) throw err;
             console.log('bank saved');
});
module.exports = function (app) {
    //show all stores
    app.get("/api/banks",function(req,res){
        Todo.find({},function(err,data){
            if (err) throw err;
            res.send({bank:data});
            console.log({bank:data});
        })
    
    }); 
//show a single store /search for store
    app.get("/api/banks/:storeid",function(req,res){
        Todo.find({storeid:req.params.storeid.replace(/\-/g," ")},function(err,data){
            if (err) throw err;
            res.send({bank:data});
//console.log({storename:req.params.name});
        })
    
    }); 
//create a store
    app.post("/api/banks/",urlencodedParser,function(req,res){
       // data.push(req.body);
       // res.json(data);
        Todo(req.body).save(function(err,data){
            if (err) throw err;
            res.json(data);
          //  res.render("todo",{todos:data});
            console.log('bank saved');
            });
       
       // console.log({todos:req.body});
    }); 
// delete a store
    app.delete("/api/banks/:storeid",function(req,res){
        Todo.find({storeid:req.params.storeid.replace(/\-/g," ")}).remove(function(err,data){

            if (err) throw err;
            res.json(data)
            
            
            })
        });

        //update a store
    app.put("/api/banks/:storeid",urlencodedParser,function(req,res){
            Todo.findById(req.params.storeid.replace(/\-/g," "),function(err,data){
    
                if (err) throw err;
                //data.storename = req.body.storename;
               // data.storeid = req.body.storedescription;
                data.bankname = req.body.bankname;
                data.email = req.body.email;
                data.nuban = req.body.nuban;
                data.accountname = req.body.accountname;
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
