


import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import mongoose from "mongoose"

dotenv.config({ path: './.env'});




const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const DATABASE = process.env.DATABASE


const DB = `${DATABASE}`

mongoose.connect(DB).then(()=>{
    console.log('connection successful');
}).catch((err)=>console.log(err));


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

const alumniSchema = new mongoose.Schema({
    name: String,
    email: String,
    company: String,
    experience: Number
})

const Alumni = new mongoose.model("Alumni", alumniSchema)


//routes

app.post("/login",async (req,res)=>{
    const { email, password} = req.body
try{
    
    
    const user= await  User.findOne({ email: email}) 
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        }
            else{
                res.send({message: "User not registered"})
            }
        



}
       catch(err) {
        res.status(500).json(err);   
            };
        })


app.post("/register", async (req, res)=> {
    const { name, email, password} = req.body
    
try{   
const user=await User.findOne({email: email})

    if(!user){
        
        const user = new User({
            name,
            email,
            password
        }) ;

        await user.save({}) 
        .then(function(){
            res.send( { message: "Successfully Registered, Please login now." }) })
            .catch((err) => { res.send(err) });
    }else{
        res.send({message: "User already registerd"})
    }
    }


        
catch(error){
        res.status(500).json(error);    
            };

    
}) 

app.post("/alumniRegister",async(req,res)=>{
    const { name, email,company,experience} = req.body
    
    try{   
    const user=await Alumni.findOne({email: email})
    
        if(!user){
            
            const user = new Alumni({
                name,
                email,
                company,
                experience
            }) ;
    
            await user.save({}) 
            .then(function(){
                res.send( { message: "Successfully Registered" }) })
                .catch((err) => { res.send(err) });
        }else{
            res.send({message: "User already registered"})
        }
        }
    
    
            
    catch(error){
            res.status(500).json(error);    
                };
    
})


app.get("/getAllUser",async(req,res)=>{
    try{
        const allUser= await Alumni.find({});
        res.send({status: "ok",data: allUser });
    }catch(error){
        console.log(error);
    }
});



app.listen(9002,()=>{
    console.log("be started in 9002");
})

