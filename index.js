// express is not a inbuilt package its third party package so it has to be installed
// building express app with nodejs
// we are doing what mock api did for us
// const { MongoClient} = require("mongodb");
// const express=require("express");//importing express

import { MongoClient} from "mongodb";
import express from "express"; //importing express
import dotenv from "dotenv";

dotenv.config();
// console.log(process.env)
// environment variables
const app=express();

// const PORT=4000;
const PORT=process.env.PORT;
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

// app.use -->Intercepts all the request applies express.json() (inbuilt middleware)
app.use(express.json());
// function to create connection between app and database
// const mongoURL="mongodb://localhost"//node js version16
// const mongoURL="mongodb://127.0.0.1"//if avobe doesnt work than use it,above version 16

// const mongo_URL="mongodb+srv://ayush:ayush123@cluster0.ppxce.mongodb.net"//should be deleted
// but dont commit it to gitHub this with url because it contain username and password

const mongo_URL=process.env.mongo_URL

async function createConnection(){
    const client= new MongoClient(mongo_URL);
   await client.connect();
   console.log("Mongodb is connected");
   return client
}
// it take some time to connect ,so we should wait for that so
const client=await createConnection()

app.get("/",function(request,response){
    response.send("Hello Ayush,hi")
});

// get all movies
app.get("/movies",async function(request,response){
    // db.movies.find({})
    // find does not return array it return cursor,cursor is nothing but pagination,they show in pagination because performance will be better(give first 20 result ),cursor->array(toArray())

    if(request.query.rating){
        request.query.rating= +request.query.rating
    }
    const movies=await client.db("guvi-db").collection("movies").find(request.query).toArray();
    console.log("movies" + movies)
    response.send(movies)
    console.log(request.query)
    // but if there was rating in the query then first convert to number
});

// get movie by id
app.get("/movies/:id",async function(request,response){
    const {id}=request.params;
    console.log(request.params,id)
    // db.movies.findOne({id:"101"})
    // const movie=movies.filter((mv)=>mv.id=id)//it will return array
    // const movie=movies.find((mv)=>mv.id===id)//find will always return element (object in this case) not array

    const movie= await client.db("guvi-db").collection("movies").findOne({id:id})
    // response.send(movies)
    console.log(movie)
    movie ? response.send(movie) :response.status(404).send({msg:"Movie not found"})
});

// create a movie/movies
//middleware(),inbuilt-express.json()-->convert body to json 
app.post("/movies", async function(request,response){
    const data=request.body;
    console.log(data)
// db.movies.insertMany(data)

const result=await client.db("guvi-db").collection("movies").insertMany(data)
    response.send(result)
});

// delete a movie
app.delete("/movies/:id",async function(request,response){
    const {id}=request.params;
    console.log(request.params,id)
    // db.movies.deleteOne({id:"101"})
    // const movie=movies.filter((mv)=>mv.id=id)//it will return array
    // const movie=movies.find((mv)=>mv.id===id)//find will always return element (object in this case) not array

    const result= await client.db("guvi-db").collection("movies").deleteOne({id:id})
    // response.send(movies)
    console.log(result)
    result.deletedCount>0 ? response.send({mesg:"movie Deleted SuccesFully"}) :response.status(404).send({msg:"Movie not found"})
});

// update a movie(update is combination of get and post)
app.put("/movies/:id",async function(request,response){
    const {id}=request.params;
    console.log(request.params,id)
    const data=request.body;
//   db.movies.updateOne({id:"101"},{$set:data})

const result= await client.db("guvi-db").collection("movies").updateOne({id:id},{$set:data})

response.send(result)
});



// app.listen(3000)//define in which port it should run
app.listen(PORT,()=>console.log(`App started in ${PORT}`))


// npm init-y-->create a package.json
// git init -->initialise git project
// ctrl + c --> cut the server
// find is part of js
// postman is used for testing purpose ,to test our APIs
// now we will connect mongodb to our app