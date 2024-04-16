import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRouter from './router/web';
import cookieParser from 'cookie-parser';
import session from "express-session";
import connectFlash from "connect-flash";
import passport from "passport";
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8083
//use cookie parser
app.use(cookieParser('secret'));

//config session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 86400000 1 day
    }
}));

//
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//
configViewEngine(app);

//
app.use(connectFlash());

//
app.use(passport.initialize());
app.use(passport.session());

//
initWebRouter(app);



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})