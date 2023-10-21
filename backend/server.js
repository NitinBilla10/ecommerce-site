import express  from 'express';
const app = express();
import bodyParser from 'body-parser';
import cors from "cors";
import path from 'path';
import connectDB from './config/db.js';
const PORT = 3000;


import authRoute from './routes/authRoute'



app.use(cors())
//database connection
connectDB()


//middle ware
app.use(bodyParser.json({limit: "50mb"}))
app.use(bodyParser.urlencoded({extended: true , limit: "50mb"}))

//cors

app.use(( req, res, next) =>{
    req.header("Access-Control-Allow-Origin","*")
    req.header("Access-Control-Allow-Headers","*")
    next()
})

//Routes
app.use("/v1/auth", authRoute)

// const buildpath =path.join(__dirname,"..","frontend","build");
// // app.use('/uploads', express.static(path.join(__dirname, "/../uploads")))
//  app.use( express.static(buildpath))

// app.get("*", async (req,res)=>
// {
//      try{
//         res.sendFile(path.join(buildpath, 'index.html'));
//     }catch(e){
//         res.send("Unexpected Error !!!")
//         res.send(console.log(e))
//     }
// }

// )





app.listen(process.env.PORT || PORT , ()=>{
    console.log(`Listening at Port: ${PORT}`)
})


