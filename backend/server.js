import express  from 'express';
const app = express();
import bodyParser from 'body-parser';
import cors from "cors";
import path from 'path';
import connectDB from './config/db.js';
import 'dotenv/config';

import authRoute from './routes/authRoute.js'
import productsRoute from './routes/productsRoute.js'




//database connection
connectDB()
app.use(express.json({limit: '50mb'}))



//cors

app.use(( req, res, next) =>{
    req.header("Access-Control-Allow-Origin","*")
    req.header("Access-Control-Allow-Headers","*")
    next()
})
app.use(cors())

//Routes
app.use("/v1/auth", authRoute)
app.use('/v1/products',productsRoute)
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

app.use(express.static(path.join(__dirname,'./build')))

app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,'./build/index.html'))

})





app.listen(process.env.PORT, ()=>{
    console.log(`Listening at Port: ${process.env.PORT}`)
})


