const express       = require('express');
const router        = express.Router();
const User          = require('../../models/user');
const passport      = require('passport');

const routeFunctions = require('./controller');

//Index Route
router.get('/', routeFunctions.indexPage);

//Get - User Signup form
router.get('/register', routeFunctions.registerPage);



//Post - Retrive User Singup info
router.post('/users', routeFunctions.postRegisterPage)

//Get - Login routes
router.get('/login', routeFunctions.loginPage);

//Post - Login Credentials
router.post('/login', passport.authenticate('local', {
    successRedirect: "/users",
    failureRedirect: "/login"
}) , routeFunctions.postLoginPage);

//Get - Logout route
router.get('/logout', routeFunctions.logoutPage)

//Get - All users
router.get('/users', routeFunctions.isLoggedIn, routeFunctions.usersPage);

//Get - Redirect invalid routes to Index Page
router.get('*', routeFunctions.invalidPage);

module.exports = router;