// // list all dbs
// show dbs

// //create and switch dbs
// use local

// // check current db
// db

// // list all collection in my database
// show collections

// // create collection with name movies


// add document to collection
db.movies.insertMany([
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
])

// to check documents
db.movies.find({})

// makes output pretty and readable
db.movies.find({}).pretty()
db.movies.find({rating:8}).pretty()
db.movies.find({rating:{$gt:8}}).pretty()

// to calculate no. of document(rows)
db.movies.find({}).count()

// to clear panel
cls

// projection-->filtering the require field only
// projection- inclusion
db.movies.find({},{name:1,rating:1}).pretty()

// projection - exclusion
db.movies.find({},{summary:0,trailer:0}).pretty()

// if you mix it will throw error
db.movies.find({},{name:1,rating:0}).pretty()

// exception where we can mix 
db.movies.find({},{_id:0,name:1,rating:1}).pretty()

// sorting-descending or ascending
// sorting ascendiding
db.movies.find({},{name:1,rating:1}).sort({rating:1})

// sorting descendiding
db.movies.find({},{name:1,rating:1}).sort({rating:-1})

// if rating are equal than should come by nmae
db.movies.find({},{name:1,rating:1}).sort({rating:1,name:1})

// bY default the collection is in order of _id like 1a,1b,1c,1d(hexadecimal)

// limit and skip
db.movies.find({},{name:1,rating:1}).sort({rating:-1}).limit(2)

db.movies.find({},{name:1,rating:1}).sort({rating:-1}).limit(2).skip(2)

// in case of database it is always a compromise between inserting and reading speed
// mongoDB is faster reading but slower insertion ,good for social media 
// sql is balanced but not good for social medias etc
// some specific database are also there like graphDB(used by facebook) which are more close to NoSequel etc
// some require faster insertion then reding like stock market,booking ticket(uses locking tecqnique),weather forecast
// sometime we need fast reading and fast insertion for that case we usse multiple database(microservice architecture example:NetFlix)


// Aggregation(summary or stats)-->

db.orders.insertMany([
    { 
        _id:0,productName:"Steel beam",status:"new",quantity:10
    },
    { 
        _id:1,productName:"Steel beam",status:"urgent",quantity:20
    },
    { 
        _id:2,productName:"Steel beam",status:"urgent",quantity:30
    },
    { 
        _id:3,productName:"Iron rod",status:"new",quantity:15
    },
    { 
        _id:4,productName:"Iron rod",status:"urgent",quantity:50
    },
    { 
        _id:5,productName:"Iron rod",status:"urgent",quantity:10
    }
])

db.orders.find({})

db.collection.aggregate([
    // stage first-->filtering
    {$match:{status:"urgent"}},
    // $match-->aggregation operator

    //stage two--->grouping by product name
    { $group:{_id:"$productName",totalUrgentQuantity:{$sum:"$quantity"}}}
])

// drivers convert the different language to which mongoDB understands

// node js is place to write javascript,javascript can be written in browser also ,but browser cannot create, read, update or delete any file
// browser are restricted to all these

//javascript is single thread(can execute only one line at a time) ,ex-only one cook and asynchronous(smart) language-->
// java is multithread(can execute multiple lines at a time),ex->multiple cook ,it is faster than javascript

// stack -->work on first in last out,or last in first out

// setTimeOUt ia not part of JS,its part browser's code(Webapis)
// anything which take time comes under web API's
// when we try to console setTiemOut its shows native code means not written in Javscript

// js can run in call stack only not in webapis 
// web apis is place to wait
// if anything asynchronous it should go to web apis(callback function)
// callback is not a function inside another function,it is like some action is taken when some event is completed,all event listeners are callback functions
// event completion always deal with time
// asynchronous is realated with time,it always has time related thing
// if one function depend on another then when ,then the function remain in stack untill the function is done
// promises are asynchronous
// in case of fetch it will wait untill the data return
// all event listners are asynchrounous means they all are part of webapis

//whatever happen in call stack we call it blocking operation because it is blocking the entry from queue
// call stack is also called main thread
// animation are all part of webapis
// it is always adviced to keep  call stack free
// good quality code keeps call stack can we make free,like not do much nesting

// SUMMARY of how javascript runs on browser-->
// call stack is place all our code run,web apis is place wait for stuff
// event loop push the content from callback queue to call stack only when call stack is empty
// the goal is keep call stack empty so it doesnt block stuff to push from queue to stack


// node js took the engine from chrome(V8 engine)
// then added a thin layer on top of V8 engine called NODE.JS BINDINGS(Node API),that can do all os operation(access files,CRUD etc)


// in embedded documents we can do  nesting upto 100 levels and upto 16mb per documents
// mongodb automatically creates unique id by itself represent with _id which has objectId as its data types

// mongodb 