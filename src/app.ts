import express, { Request, Response } from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import passport from "passport";
import envVars from './app/config/env';
import "./app/config/passport";
import notFound from './app/middlewares/notFound';
import { Routes } from './app/router';

const app = express()


// Middlewares
app.use(expressSession({
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())
app.use(express.json())
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: envVars.FRONTEND_URL,
    credentials: true
}))


// Api routing version 1
app.use('/api/v1', Routes);

// check if server is running
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to Ride Booking Backend"
    })
})

// Error Handler
app.use(notFound);

export default app