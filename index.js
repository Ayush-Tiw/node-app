// express is not a inbuilt package its third party package so it has to be installed

const express=require("express");//importing express
const app=express();
app.get("/",function(req,res){
    res.send("Hello World")
})



// npm init-y-->create a package.json
// git init -->initialise git project