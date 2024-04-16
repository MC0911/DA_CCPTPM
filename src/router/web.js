import express from 'express';
import HomeController from '../controller/HomeController';
import LoginController from '../controller/LoginController';
import RegisterController from '../controller/RegisterController';
import initPassportLocal from "../controller/passportLocalController";
import passport from 'passport';
import BooktableController from '../controller/BooktableController';
import AdminController from '../controller/AdminController';

initPassportLocal();

let router = express.Router();

let initWebRouter = (app) => {
    //Index
    router.get('/', HomeController.getHomepage);
    router.get('/index', HomeController.getHomepage);
    //Login
    router.get('/login', LoginController.getPageLogin);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/index",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));
    //Logout
    router.post("/logout", LoginController.postLogOut);
    //Register
    router.get('/register', RegisterController.getPageRegister);
    router.post("/register", RegisterController.createNewUser);
    //Booktable
    router.get('/floors', BooktableController.getFloors);
    router.get('/tables', BooktableController.getTablesByFloor);
    router.post('/booktable', BooktableController.bookTable);
    //Admin
    router.get('/admin', AdminController.getPageAdmin);

    return app.use('/', router)
};

module.exports = initWebRouter;
