// custom middleware-->it is function only
import jwt from "jsonwebtoken"

export const auth=(request,response,next)=>{
    // first get the token from request(token is part of request)
    try{
    const token=request.header('x-auth-token');
    consoe.log(token)
    jwt.verify(token,process.env.SECRET_key)
    next();
    }catch(err){
response.status(401).send({error:err.message})
    }
}

// we should not put token on global level(with app.use(express.json())) we should choose which api need token to get access
//if we dont use next(it is callback) then it will not go next function after auth in get movies api and if we try to send in postman then it will keeping shwing sending
//middleware is working
// last step is we should check token is valid or not
// if token is incorrect it throw errrror so we do try catch on this
//so if there is error auth will not allow to move to next function(function(request,response))

// now if want to protect other route also so we can give auth to that also