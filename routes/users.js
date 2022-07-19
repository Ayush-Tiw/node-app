import express from "express"
const router= express.Router();
import {client} from "../index.js"
import {objectId} from "mongodb"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
//signup
async function genHashedPassword(password){
    const NO_OF_ROUNDS = 10;
    const salt= await bcrypt.genSalt(NO_OF_ROUNDS);
    const hashedPassword =await  bcrypt.hash(password,salt)
    // console.log(salt,hashedPassword)
    return hashedPassword;
}
async function getUserByName(username){

    return await client.db("guvi-db").collection("users").findone({username:username})
}

router.post("/signup", async function(request,response){
    // const data=request.body;
    const {username,password}=request.body;
    console.log(data)
// db.users.insertOne(data)

const userFromDB= await getUserByName(username)
console.log(userFromDB)//this will show null if not present any match,if we have match it shows userdetails we can make use f it to block

// password min length should be 8 characters
// we can add another else if condition after if

if(userFromDB){
    response.status(400).send({message:"username already exist"})
}
else if(password.length<8){
    response.status(400).send({message:"password should be min 8 character"})

}
else{
    // allow user to create new acc.

    const hashedPassword= await genHashedPassword(password)
console.log(hashedPassword)
const result=await client.db("guvi-db").collection("users").insertOne(data)
// const result=await createUser({
//     username: username,
//     password:hashedPassword,
// })
    response.send(result)


}

// const hashedPassword= await genHashedPassword(password)
// console.log(hashedPassword)
// const result=await client.db("guvi-db").collection("users").insertOne(data)
// // const result=await createUser({
// //     username: username,
// //     password:hashedPassword,
// // })
//     response.send(result)
});


//login
router.post("/login", async function(request,response){
    // const data=request.body;
    const {username,password}=request.body;
    
// db.users.insertOne(data)

const userFromDB= await getUserByName(username)
console.log(userFromDB)


// we should not give like invalid username or password,by this hacker will get which is incorrect username or password
if(!userFromDB){
    response.status(401).send({message:"Invalid credentials"})
}else{
    //check password
    const storePassword=userFromDB.password;//give hash value,we should cpmare both password
  const isPasswordMatches=await  bcrypt.compare(password,storePassword);
  console.log(isPasswordMatches)

  if(isPasswordMatches){
    const token=jwt.sign({id:userFromDB._id},process.env.SECRET_KEY)
    response.send({message:"succesfull login",token:token})
  }else{
    response.status(401).send({message:"invalid credentials"})
  }
}


});

export const userRouter=router;