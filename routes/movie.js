import express from "express"
const router= express.Router();
import {client} from "../index.js"
import {objectId} from "mongodb"
import  {auth}  from "../middleware.auth.js"

// // get all movies
// app.get("/movies",async function(request,response){
//     // db.movies.find({}) find does not return array it return cursor,cursor is nothing but pagination,they show in pagination because performance will be better(give first 20 result ),cursor->array(toArray())
//     //

//     if(request.query.rating){
//         request.query.rating= +request.query.rating
//     }
//     const movies=await client.db("guvi-db").collection("movies").find(request.query).toArray();
//     console.log("movies" + movies)
//     response.send(movies)
//     console.log(request.query)
//     // but if there was rating in the query then first convert to number
// });

// // get movie by id
// app.get("/movies/:id",async function(request,response){
//     const {id}=request.params;
//     console.log(request.params,id)
//     // db.movies.findOne({id:"101"})
//     // const movie=movies.filter((mv)=>mv.id=id)//it will return array
//     // const movie=movies.find((mv)=>mv.id===id)//find will always return element (object in this case) not array

//     const movie= await client.db("guvi-db").collection("movies").findOne({id:id})
//     // response.send(movies)
//     console.log(movie)
//     movie ? response.send(movie) :response.status(404).send({msg:"Movie not found"})
// });

// // create a movie/movies
// //middleware(),inbuilt-express.json()-->convert body to json 
// app.post("/movies", async function(request,response){
//     const data=request.body;
//     console.log(data)
// // db.movies.insertMany(data)

// const result=await client.db("guvi-db").collection("movies").insertMany(data)
//     response.send(result)
// });

// // delete a movie
// app.delete("/movies/:id",async function(request,response){
//     const {id}=request.params;
//     console.log(request.params,id)
//     // db.movies.deleteOne({id:"101"})
// with normal method
//     // const movie=movies.filter((mv)=>mv.id=id)//it will return array
//     // const movie=movies.find((mv)=>mv.id===id)//find will always return element (object in this case) not array
// with client
//     const result= await client.db("guvi-db").collection("movies").deleteOne({id:id})
//     // response.send(movies)
//     console.log(result)
//     result.deletedCount>0 ? response.send({mesg:"movie Deleted SuccesFully"}) :response.status(404).send({msg:"Movie not found"})
// });

// // update a movie(update is combination of get and post)
// app.put("/movies/:id",async function(request,response){
//     const {id}=request.params;
//     console.log(request.params,id)
//     const data=request.body;
// //   db.movies.updateOne({id:"101"},{$set:data})

// const result= await client.db("guvi-db").collection("movies").updateOne({id:id},{$set:data})

// response.send(result)
// });


// get all movies
router.get("/",auth,async function(request,response){
    // db.movies.find({})
    // find does not return array it return cursor,cursor is nothing but pagination,they show in pagination because performance will be better(give first 20 result ),cursor->array(toArray())

    if(request.query.rating){
        request.query.rating= +request.query.rating
    }
    const movies=await getAllMovies(request);
    console.log("movies" + movies)
    response.send(movies)
    console.log(request.query)
    // but if there was rating in the query then first convert to number
});

// get movie by id
router.get("/:id",auth,async function(request,response){
    const {id}=request.params;
    console.log(request.params,id)
    // db.movies.findOne({id:"101"})
    // const movie=movies.filter((mv)=>mv.id=id)//it will return array
    // const movie=movies.find((mv)=>mv.id===id)//find will always return element (object in this case) not array
    // const movie= await client.db("guvi-db").collection("movies").findOne({_id: objectId(id) });
    const movie= await getMovieByID(id)
    // response.send(movies)
    console.log(movie)
    movie ? response.send(movie) :response.status(404).send({msg:"Movie not found"})
});

// create a movie/movies
//middleware(),inbuilt-express.json()-->convert body to json 
router.post("/",auth, async function(request,response){
    const data=request.body;
    console.log(data)
// db.movies.insertMany(data)

const result=await client.db("guvi-db").collection("movies").insertMany(data)
    response.send(result)
});

// delete a movie
router.delete("/:id",auth,async function(request,response){
    const {id}=request.params;
    console.log(request.params,id)
    // db.movies.deleteOne({id:"101"})
    // const movie=movies.filter((mv)=>mv.id=id)//it will return array
    // const movie=movies.find((mv)=>mv.id===id)//find will always return element (object in this case) not array

    const result= await client.db("guvi-db").collection("movies").deleteOne({_id: objectId(id)})
    // response.send(movies)
    console.log(result)
    result.deletedCount>0 ? response.send({mesg:"movie Deleted SuccesFully"}) :response.status(404).send({msg:"Movie not found"})
});

// update a movie(update is combination of get and post)
router.put("/:id",async function(request,response){
    const {id}=request.params;
    console.log(request.params,id)
    const data=request.body;
//   db.movies.updateOne({id:"101"},{$set:data})

const result= await client.db("guvi-db").collection("movies").updateOne({_id: objectId(id)},{$set:data})

response.send(result)
});

export const moviesRouter=router;



async function getMovieByID(id) {
    return await client.db("guvi-db").collection("movies").findOne({_id: objectId(id) });
}

async function getAllMovies(request) {
    return await client.db("guvi-db").collection("movies").find(request.query).toArray();
}

