const express = require('express');
const mongoose = require('mongoose');
const multer = require("multer")();
const cors = require('cors')
const app =express();
const userModel = require('./schema');
app.use(multer.array());

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

app.use(express.json({ limit: '10mb' }));
app.listen(5005,()=>{
    console.log('server running at 5005 port');
})

mongoose.connect('mongodb://localhost/HoneyComb',()=>{
    console.log('connected to DB')
}),
    (err)=>console.log(err)

    app.post("/users", (req, res)=> {
        console.log(req.body);
        userModel.create({
            id:req.body.id,  
            userName:req.body.userName,
            email:req.body.email,
            contactNo:req.body.contactNo,
            DOB:req.body.DOB,
            postImage:req.body.postImage,
            countryId:req.body.countryId,
            stateId:req.body.stateId
        }) .then((data)=>{
            res.status(200).send(data)
           }).catch((err)=>{
           console.log(err)
           })  
    });
    app.get("/userData",(req,res)=>{
        userModel.find().then((data)=>{
            res.status(200).send(data)
            
        }).catch((err)=>{
            res.status(400).send(err)
        })
    })
    app.delete("/userDelete",(req,res)=>{
        userModel.find({email: req.body.email}).then((userData)=> {
            
            if(userData.length) {
                    userData.deleteOne();
                
            } else {
                res.status(400).send("Unauthorized user");
            }
        })
    })
    app.put("/userEdit",(req,res)=>{
        userModel.find({email: req.body.email}).then((userData)=> {
            
            if(userData.length) {
                    userData.email=req.body.email;
                
            } else {
                res.status(400).send("Unauthorized user");
            }
        })
    })