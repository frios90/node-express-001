import 'dotenv/config'
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import './database/connectionMongo.js'

import authRouter from './routes/auth.route.js';
import linkRouter from './routes/link.route.js';
const app = express()

const whiteList = [process.env.ORIGIN1];
app.use(
    cors({
        origin: function(origin, callback) {
            if (whiteList.includes(origin)) {
                return callback(null, origin);
            }
            return callback("No autorizado por CORS");
        },
    })
);

// Middlewares
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//Routes
app.use('/api/v1/auth', authRouter)
app.use("/api/v1/links", linkRouter);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`iniciando mi servidor con node express http://localhost:${PORT}`))