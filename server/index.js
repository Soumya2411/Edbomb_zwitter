import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import morgan from 'morgan';
import path from "path"
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import { register } from './controllers/auth.js';
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import {verifyToken} from './middleware/authentication.js'
import { createPost } from "./controllers/posts.js";
import postRouter from './routes/posts.js'

// CONFIGURATIONs
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express()
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors());
app.use("/assets",express.static(path.join(__dirname,'public/assets')));

// FILESTORAGE
const storage = multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,"public/assets");
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
})
const upload = multer({storage});

// ROUTESwithfiles
app.post("/auth/register",upload.single("picture") ,register)
app.post("/posts",verifyToken,upload.single("picture"),createPost)
//ROUTES
app.use("/auth",authRouter)
app.use("/user",userRouter)
app.use("/posts",postRouter)

// MONGODBCONNECTION

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_DB,{
    useNewUrlParser:true,
    // useUnifiedTypology:true,
}).then(()=>{
    app.listen(PORT,()=>console.log(`SERVER INITIATED BEEP BEEP : ${PORT}`));
}).catch((error)=> console.log(`BRR BRR ${error} BRRRR BRR`));
