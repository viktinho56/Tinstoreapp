//tinsoft:Hidemyass2@ds030500.mlab.com:30500/tinstore
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended:false});
var mongoose =require("mongoose");
mongoose.connect('mongodb://uuucmrm9fp3tqciemmgr:O4wSkGwPbhhFbxFesQuP@bnqwzhcnme3b8l9-mongodb.services.clever-cloud.com:27017/bnqwzhcnme3b8l9');
var storeSchema = new mongoose.Schema({
    storename:String,
    storedescription:String,
    logo:String,
    email:String,
    number:Number,
    address:String,
    state:String,
    country:String,
    bank:{bankname:String,accountname:String,nuban:String,balance:String},
    active:Boolean,
    createdAt: {type: Date, default: Date.now}
    });
    
var  Todo = mongoose.model('Stores',storeSchema); 
/* var itemOne = Todo({storename:"SPL Stores",
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
console.log({stores:data});
        }).sort({"storename":-1})
    
    }); 
//show a single store /search for store
    app.get("/api/stores/:storename",function(req,res){
        Todo.find({storename:req.params.storename.replace(/\-/g," ")},function(err,data){
            if (err) throw err;
            res.send({stores:data});
//console.log({storename:req.params.name});
        })
    
    }); 
    app.post("/api/stores/login",urlencodedParser,function(req,res){
        // data.push(req.body);
        // res.json(data);
       
        Todo.findOne({$and:[{email:req.body.email.replace(/\-/g," ")},{number:req.body.number.replace(/\-/g," ")}]},function(err,data){
            if (err) throw err;
            if(data==null){
                var response = {
                    "result":{
                    "responsecode":0,
                     "status":"Login Error"
                    }
                 }
            }
            else{
                var response = {
                   "result":{
                    "responsecode":1,
                    "status":"Login Successfull"
                   }
                }
            }
            res.json(response);
//console.log({storename:req.params.name});
        })
         // console.log({todos:req.body});
     });
//create a store
    app.post("/api/stores/create",urlencodedParser,function(req,res){
        Todo.findOne({storename:req.body.storename.replace(/\-/g," ")},function(err,data){
            if (err) throw err;
            if(data==null){
                var storevalues =
                {
                storename:req.body.storename,
                storedescription:req.body.storedescription,
                logo:"",
                email:req.body.email,
                number:req.body.number,
                address:req.body.address,
                state:req.body.state,
                country:req.body.country,
                bank:
                {
                bankname:"",
                accountname:"",
                nuban:"",
                balance:""
                
                },
                active:false
                
                }
                Todo(storevalues).save(function(err,data){
                    if (err) throw err;
                    var response = {
                        "result":{
                         "responsecode":1,   
                         "status":"Saved Successfully"
                        }
                     }
                     res.json(response);
                    });
            }
            else{
                var response = {
                   "result":{
                    "responsecode":0,
                    "status":"Store Exist Already"
                   }
                }
                res.json(response);
            }
           
       //console.log({storename:req.params.name});
        });
    }); 
// delete a store
    app.delete("/api/stores/:storename",function(req,res){
        Todo.find({storename:req.params.storename.replace(/\-/g," ")}).remove(function(err,data){

            if (err) throw err;
            var response = {
                "result":{
                 "responsecode":1,
                 "status":"Deleted Successfully"
                }
             }
             res.json(response);
           // res.json(data)
            
            
            })
        });

        //update
    app.put("/api/stores/updatedetails/:storeid",urlencodedParser,function(req,res){
            Todo.findById(req.params.storeid.replace(/\-/g," "),function(err,data){
    
                if (err) throw err;
                if(data == null)
                {
                    var response = {
                        "result":{
                         "responsecode":0,
                         "status":"Store not found"
                        }
                     }
                     res.json(response);
                }
                else
                {
                    data.storename = req.body.storename;
                    data.storedescription = req.body.storedescription;
                    data.logo = req.body.logo;
                    data.email = req.body.email;
                    data.number = req.body.number;
                    data.address = req.body.address;
                    data.state = req.body.state;
                    data.country = req.body.country;
                    data.active = req.body.active;
                    data.save(function(err) {
                    if (err)
                    res.send(err);
                    var response = {
                        "result":{
                         "responsecode":1,
                         "status":"Updated Successfully"
                        }
                     }
                     res.json(response);
                   // res.json(data);
                
                });
                }
               
               
                
                
                });
            });
            app.put("/api/stores/updatelogo/:storeid",urlencodedParser,function(req,res){
                Todo.findById(req.params.storeid.replace(/\-/g," "),function(err,data){
        
                    if (err) throw err;
                    if(data == null)
                    {
                        var response = {
                            "result":{
                             "responsecode":0,
                             "status":"Store not found"
                            }
                         }
                         res.json(response);
                    }
                    else
                    {
                        
                        data.logo = req.body.logo;
                       
                        data.save(function(err) {
                        if (err)
                        res.send(err);
                        var response = {
                            "result":{
                             "responsecode":1,
                             "status":"Logo Updated Successfully"
                            }
                         }
                         res.json(response);
                       // res.json(data);
                    
                    });
                    }
                   
                   
                    
                    
                    });
                });
       
            app.put("/api/stores/updatebankdetails/:storeid",urlencodedParser,function(req,res){
                Todo.findById(req.params.storeid.replace(/\-/g," "),function(err,data){
        
                    if (err) throw err;
                    if(data == null)
                    {
                        var response = {
                            "result":{
                             "responsecode":0,
                             "status":"Store not found"
                            }
                         }
                         res.json(response);
                    }
                    else
                    {
                        
                        data.bank.bankname = req.body.bankname;
                        data.bank.accountname = req.body.accountname;
                        data.bank.nuban = req.body.nuban;
                      
                        data.save(function(err) {
                        if (err)
                        res.send(err);
                        var response = {
                            "result":{
                             "responsecode":1,
                             "status":"Updated Successfully"
                            }
                         }
                         res.json(response);
                       // res.json(data);
                    
                    });
                    }
                   
                   
                    
                    
                    });
                });
      
            app.put("/api/stores/updatebalance/:storeid",urlencodedParser,function(req,res){
                Todo.findById(req.params.storeid.replace(/\-/g," "),function(err,data){
        
                    if (err) throw err;
                    if(data == null)
                    {
                        var response = {
                            "result":{
                             "responsecode":0,
                             "status":"Store not found"
                            }
                         }
                         res.json(response);
                    }
                    else
                    {
                        data.bank.balance = req.body.balance;
                       
                        data.save(function(err) {
                        if (err)
                        res.send(err);
                        var response = {
                            "result":{
                             "responsecode":1,
                             "status":"Balance Updated Successfully"
                            }
                         }
                         res.json(response);
                       // res.json(data);
                    
                    });
                    }
                   
                   
                    
                    
                    });
                });
        
            
       //
      //  res.render("todo",{todos:data});
    
}
