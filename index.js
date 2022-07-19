// build express app with nodeJs

// mock api job is  done by nodeJs, we write db commands in node js,,these commands (query) will fetch data from mongodb,then mongo db return data to node ,node return to react
// express a frame work on top of node js to build servers,we can build server by other also but with express is 100 times faster to  build server.Servers are nothing but rest apis end points
// sales,meteor,koa are other framework like express with which we can build servers
// express is popular we can start server in just 10 line
// lets build server
// create index.js file
// npm init-y-->create a package.json
// then install express(npm install express)
// const express=require("express")//importing 3rd party package
// const app=express();//we are calling function so we can apply different methods

// app.get("/",function(request,response){
    // 
//     response.send("Hello Ayush,hi")
// });

// app.listen(3000)//port number in which we want to run

// git init -->initialise git project
// ctrl + c --> cut the server
// nmp install-->install all the package mention in package.json
// node index.js-->commmand to run express app
// npm start after manipulating package.json
// npm run dev -->after nodeman download it will automatic refresh page

// express is not a inbuilt package its third party package so it has to be installed
// building express app with nodejs
// we are doing what mock api did for us by creating our own database and server


// const { MongoClient} = require("mongodb");
// const express=require("express");//importing express

import { MongoClient} from "mongodb";
import express from "express"; //importing latest express then importing it like(const express=require("express")this)
import dotenv from "dotenv";//importing
import {moviesRouter} from "./routes/movie.js"
import {usersRouter} from "./routes/users.js"
import cors from "cors";
import bcrypt from "bcrypt"

dotenv.config();//function if we want anything configration
// console.log(process.env)
// environment variables


const app=express();

// const PORT=4000;
const PORT=process.env.PORT;

app.use(cors())
// now we have converted all the apis to mongodb so we now dont need this data
const movies=[
    {
        id:"100",
        image:"https://englishtribuneimages.blob.core.windows.net/gallary-content/2021/6/Desk/2021_6$largeimg_977224513.JPG" ,
        title:'RRR',
        ratings:8.8,
        description:"RRR is an upcoming Indian Telugu-language period action drama film directed by S. S. Rajamouli, and produced by D. V. V. Danayya of DVV Entertainments.",
        trailer:"https://www.youtube.com/embed/NgBoMJy386M"

    },
    {
        id:"101",
        image: "https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_FMjpg_UX1000_.jpg",
        title:'Iron man 2',
        ratings:7,
        description:"With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.",
        trailer:"https://www.youtube.com/embed/RHT1CIrcLCk"

    },
    {
        id:"102",
        image:"https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg" ,
        title:'Jai Bhim',
        ratings:8.8,
        description:"A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case",
        trailer:"https://www.youtube.com/embed/nnXpbTFrqXA" 

    },
    {
        id:"103",
        image:"https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg" ,
        title:'The Avengers',
        ratings:8,
        description:"Marvel's The Avengers (classified under the name Marvel Avengers Assemble in the United Kingdom and Ireland), or simply The Avengers, is a 2012 American superhero film based on the Marvel Comics superhero team of the same name.",
        trailer:"https://www.youtube.com/embed/LPhqL4DqzBg"

    },
    {
        id:"104",
        image:"https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg" ,
        title:'Interstellar',
        ratings:8.8,
        description:"When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans",
        trailer:"https://www.youtube.com/embed/zSWdZVtXT7E"

    }
]
// for now we are getting movies data locally from movies array
// app.get("/",function(request,response){
//     response.send("Hello Ayush,hi")
// });

// //  /movies
// app.get("/movies",function(request,response){
//     response.send(movies)
// })//data is in javascript object not in json but express is converting it to json automatically

// by nodemone we dont need to again cut server and connect it automatically restart server when we add anything
// we download it as dev dendency not normal,so it dont needed for custumer need for only developer
// to run we use npm run dev,because  with all script we use npm run except start in start we only do npm start.npm run test etc

// to get particular movie
// match dynamic path-->:id
// app.get("/movies/:id",function(request,response){
//     // this id number will be store in request,and it will be in request.params
//     // request.params is an object we can destructure it to get id
//     const {id}=request.params;
//     // to get particular movie we use filter method
//     const movie=movies.filter((mv)=>mv.id===id)//filter return array,instead we use find which return object

//     // db.movies.findOne({id:id})-->query to get only one document

//     console.log(request.params,id)
//     // response.send(movie)
//     // for id not in array it will not show anything on display sobut when there is no movie still showing status code 200,but it should show 404,so we add status(404)
//     // 
//     movie? response.send(movie) :response.status(404).send({msg:"Movie not find"})
// })

// start with postman
// open and paste the url there
// postman is place to test our apis,backend developer and testing people uses it,
// create new collection in postman,and add different request to it like get all movies etc,if we close than it does not vanishes we can continue whre we left unlike browser
// create different apis request get movie by id,and welcome message

// now we want to connect  mongodb to our app with package mongodb(install mongodb)
// now to connect we need to write function createConnection


// const mongo_URL="mongodb:localhost"//default mongodb port is 27017,we dont need to give port number here(version 16)
// const mongo_URL="mongodb://127.0.0.1"//(above version 16)//its a url for data that is locally store in mongodb
// // const mongo_URL="mongodb+srv://ayush:ayush123@cluster0.ppxce.mongodb.net"//this is online url to connect mongodb to node
// const mongo_URL=process.env.mongo_URL

// app.use(express.json());

// async function createConnection(){
//     // once we have client we can use mongo commands
//     const client= new MongoClient(mongo_URL);//this is dialing a number
//    await client.connect();//clicking call button,it take time to connect
//    console.log("Mongodb is connected");
//    return client
// }
// // now we use our client to connect to database
// // it take some time to connect ,so we should wait for that so
// export const client=await createConnection()
// // in package.json give type "module" instead of "commonjs",this support latest import export syntax

// now convert api to mongodb

// app.get("/movies/:id", async function(request,response){
   
//     const {id}=request.params;
//     // db.movies.findOne({id:"101"})-->query to get only one document

//     // const movie=movies.filter((mv)=>mv.id===id)//filter return array,instead we use find which return object
//     const movie=await client.db("node-app").collection("movies").findOne({id:id})
//     // this take some time so use await
//     console.log(request.params,id)
    
    
//     movie? response.send(movie) :response.status(404).send({msg:"Movie not find"})
// })
// now the data will come from mongodb
// postman do a kind of network panel
// now when want like when we click on postman to create or add movie(create request create movie)
// data to insert in mongodb data base to be written in body in raw then json
// when we paste and click send,it will cannot create or post because it dont have any api
// so first create an api
//  app.post("/movies",express.json(), async function(request,response){
    // app.post("/movies", async function(request,response){
    //     const data=request.body;//data is written in body so it should take from request.body  
    //     console.log(data)
    // // db.movies.insertMany(data)
    
    // const result=await client.db("guvi-db").collection("movies").insertMany(data)
    //     response.send(result)
    // });
    // but it shows error connection because app got chrashed
    // this is because we have not set to node that data send is JSON
    // so for this we use middleware(express.json-->inbuilt middleware in express) that convert data to json
// now the data is added
// so if everytime to use express.json( ) then it will be problem,so we define at one line by saying(app.use(express.json())-->this will intercept all the request)
// this will create documents in mongodb also we can go and check

// // now we write to get all movies
// app.post("/movies", async function(request,response){
// // db.movies.find({})

// const result=await client.db("guvi-db").collection("movies").find({})
//     response.send(result)
// });
// but when we check in  postman it does not written desire thing
// this because, find does not return array(give first 20 result )only it return cursor,cursor is nothing but pagination,they show in pagination because performance will be better(give first 20 result ),
// to get whole data convert cursor->array(toArray())
// now we dont need movies array all data come from mongodb now
// after writing api we take help of postman to post operation to add data to mongodb
// now instead of having mongodb locally ,we deploy mongodb to atlas,so that we get data online
// after initializing in mongodb atlas,we see there is no data in it,we can also check in post man after changing url that it will show empty array
// so now create movie to add data to online mongo atlas
// we can verify also in mongo atlas in database
// but we cannot commit to git with online url because it consist username and password then your project is visible to evryone and anyone can manipulate your data 
// so we put it in env file and we put env file in gitignore(see url above),hidden in env file 
// but without url app wont start
// for it we have special package for it called dotenv package(install it)
// import it 
// dotenv.config()
// whatever we give in env file we have global variable process.env

// now if want to get movie by filter ratings
// we generally use query params to filter things,like in youtube if we search wildlife then the pattern that form in url is called queryparams
// lets build the filter
// query param is part of request(read from input) ,whenever we filter something in postman the query automatically added to request
// check in postman by giving params
app.get("/movies", async function(request,response){
//    console.log(request.query)//it give object same as require

   if(request.query.rating){
    request.query.rating= +request.query.rating
   }
   console.log(request.query)
  const movie=await client.db("node-app").collection("movies").find(request.query).toArray()
    // this take some time so use await  
   response.send(movie)
//    request.query={name:"RRR"},like what we ask in postman params
})

// but this will not work with rating because the query come as query will be string,but rating is stored as number,so rating has to be converted to number in api
// so if we want to add this in our app in search to construct such an url by using javascript skill,like it is better to have drop down in language and slider in rating 

// lets do delete operation
// postman create delete movie by id

app.delete("/movies/:id", async function(request,response){
   
    const {id}=request.params;
    // db.movies.deleteOne({id:"101"})-->query to get only one document

 const result=await client.db("node-app").collection("movies").deleteOne({id:id})
    // this take some time so use await
    console.log(request.params,id)
    console,log(result)
    result.deletedCount>0 ? response.send({msg:"Movie deleted succesfully"}) :response.status(404).send({msg:"Movie not find"})
})
// check in postman
// but if movie is not present then it does not return movie not found

// now if we want to update any movie,create request in post update movie by id,lets update rating
// we should say in body that rating is updated to 9 of particular movie
// lets build an api for that

app.put("/movies/:id", async function(request,response){
   
    const {id}=request.params;
    const data =request.body;
    // db.movies.updateOne({id:"101"})-->query to get only one document

 const result=await client.db("node-app").collection("movies").updateOne({id:id},{$set:data})
    // this take some time so use await
    console.log(request.params,id)
    console.log(result)
})
// check in postman by giving rating as 9 to to id 102 or any


// now we deploy our node app to heroku
// after committing your app to github you can directly upload from github
// after deployment whenever you change in github it automatically update in the heroku
// in heroku in open app,if you see the app will fail
// then in more option it says that ap is chrased
// now we do few setup in vs code
// check in packagejson check for start:"node index.js"
// now come to port
// in heroku we cannot demand port in heroku
// so we allow auto assign by writing process.env.PORT
// the problem is now our app dont run locally so now we put PORT=4000,in env file
// now after pushing to github heroku automatically start building 
// one thing that is local not present in heroku,so copy the url from vscode,apn in heroku in setting in reaveal config put that url in key value pair,then add it
// now the heroku is connected to node,you can check in open app,it will display 
// you can check in postman also by copying that heroku url
// now anyone in world can use  this app

// now we organize our app
// we should break it 
// we keep all or movies apis in different file movies.js,to move to another folder we use concept of routes in express
// cut and paste all the movies apis in movies .js
// but now app wont work ,now we haveconnect between two file so we export import 
// we can use app.use("/movies",moviesRouter)
// intention here is if api start with /movies go to moviesRouter
// now we define moviesRouter in movies.js
// check in movies.js
// add const router=express.Router()
// and import express in movies.js
// now wherever app. is used replace with router.
// and export ths router as moviesRouter as export const moviesRouter=router;
// and import it in index.js as import {moviesRouter} from "./routes/movie.js"
// so we have define if /movies is presnt then come to movie.js,then ther is no need of /movies in path we can remove movies from each path
// but now it show error we need to export and import client
// now in movie.js we can do further by making function of const movie,const result etc
// now we can move all function to anoother file updataMovieById with help of vscode move to new file option and import export 
// it is easy to change when  we have seperate files for each


// now we connect our react app with heroku
// go to react app
// after doing changes in react app comes back here

// _id is not sting it is special data type i.e, objectId data type
// import objectID from mongodb
// we can do react part in heroku also but it will run very slow



// now for authentication and authorisation go authentication.txt








// app.use -->Intercepts all the request applies express.json() (inbuilt middleware)
app.use(express.json());
// function to create connection between app and database
// const mongoURL="mongodb://localhost"//node js version16
// const mongoURL="mongodb://127.0.0.1"//if avobe doesnt work than use it,above version 16

// const mongo_URL="mongodb+srv://ayush:ayush123@cluster0.ppxce.mongodb.net"//should be deleted
// but dont commit it to gitHub this with url because it contain username and password

// const mongo_URL=process.env.mongo_URL

// async function createConnection(){
//     const client= new MongoClient(mongo_URL);
//    await client.connect();
//    console.log("Mongodb is connected");
//    return client
// }
// // it take some time to connect ,so we should wait for that so
// export const client=await createConnection()




app.use("/movies",moviesRouter)
app.use("/users",usersRouter)

// app.listen(3000)//define in which port it should run
app.listen(PORT,()=>console.log(`App started in ${PORT}`))




// find is part of js
// postman is used for testing purpose ,to test our APIs
// now we will connect mongodb to our app

// https://ayush-node-app.herokuapp.com/

async function genHashedPassword(password){
    const NO_OF_ROUNDS = 10;
    const salt= await bcrypt.genSalt(NO_OF_ROUNDS);
    const hashedPassword =await  bcrypt.hash(password,salt)
    console.log(salt,hashedPassword)
}

genHashedPassword()