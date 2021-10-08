import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
// import path from "path";
// import passport from "passport";
// import mongoose from "mongoose";
// import session from "express-session";
// import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import userRouter from "./routers/userRouter";
import photoRouter from "./routers/photoRouter";
import testRouter from "./routers/testRouter";
import routes from './routes';
// import { localsMiddleware } from './middlewares';

// import "./passport";

const app = express();

// const LocalStrategy = require('passport-local').Strategy;
// passport.use(new LocalStrategy(User.authenticate()));



app.use(helmet());
app.set("view engine", "pug");
// app.set("views", path.join(__dirname, "views"));
app.set("views", process.cwd() + "/src/views");
app.use(cookieParser());
app.use(express.json()); 
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));


// app.use(passport.initialize());
// app.use(passport.session());

// app.use(localsMiddleware);


// home url
app.get(routes.home, function(req, res){
    try{
        res.json({message : "server is connected"});
    }catch{
        res.json({message : "server is not working"});
    }
})
// /test
app.use(routes.test, testRouter);
// /users
app.use(routes.users, userRouter);
// /photo
app.use(routes.photo, photoRouter);
// API-docs
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));


export default app;