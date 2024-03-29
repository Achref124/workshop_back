
//require express

const express=require("express")
const connect = require("./Config/connectDB")

//create instance
const app=express()

//middleware
app.use(express.json())

const cors=require("cors"); 
const { default: router } = require("./uploadPhoto");
const corsOptions ={ origin:'*', credentials:true, //access-control-allow-credentials:true
 optionSuccessStatus:200, } 
 app.use(cors(corsOptions))

//require dotenv
require("dotenv").config()




//connect to db
connect()


//cloudinary


const PORT=process.env.PORT

app.listen(PORT,(error)=>{
    error?console.log(error):console.log(`the server is running on PORT ${PORT}`)
})


app.use('/api/user',require('./Routes/userRoutes'))
app.use('/api/cloudinary',require("./uploadPhoto"))