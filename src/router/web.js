import express from 'express';
import HomeController from '../controller/HomeController';
// import BooktableController from '../controller/BooktableController';
import LoginController from '../controller/LoginController';
import RegisterController from '../controller/RegisterController';
// import AdminController from '../controller/AdminController';
import passportlocal from '../controller/passportlocal';
import passport from 'passport';


passportlocal();
//
let router = express.Router();

let initWebRouter = (app) => {
    //Index
    router.get('/', HomeController.getHomepage);
    router.get('/index', HomeController.getHomepage);
    //Book Table
    // router.get('/booktable', BooktableController.getBooktablepage);
    // router.post('/booktable', BooktableController.postBooktable);
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
    //Admin
    // router.get('/admin', AdminController.getFoodmenu);
    // router.get('/admin-add', AdminController.getAddFoodpage);
    // router.post('/admin', AdminController.addFood);
    // router.post('/delete-food', AdminController.deleteFood);
    // router.get('/admin-edit/:food_id', AdminController.getEditPage);
    // router.post('/admin-edit',AdminController.postUpdateFood);
    // router.get('/admin-booktable', AdminController.getBookTablepage);
    // router.post('/delete-booktable',AdminController.deleteBookTable);
    return app.use('/', router)
};

module.exports = initWebRouter;