const User          = require('../../models/user');
const passport      = require('passport');

//Middleware
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
};

//routeFunctions
function indexPage(req, res){
    res.render('home.ejs');
};

function registerPage(req, res){
    res.render('register.ejs');
}

function postRegisterPage(req, res){
    User.register(new User({username: req.body.username, email: req.body.email, phone: req.body.phone, DOB: req.body.DOB}), req.body.password, (err, User) => {
        if(err){
            console.log(err);
            return res.render('register.ejs');
        }
        passport.authenticate('local')(req, res, () => {
            res.redirect('/users');
        });
    });
};

function loginPage(req, res) {
    res.render('login.ejs');
};

function postLoginPage(req, res){};

function logoutPage(req, res){
    req.logout();
    res.redirect('/');
};

function usersPage(req, res){
    User.find({}, (err, foundUsers) => {
        if(err){
            console.log(err);
            res.redirect('/');
        } else {
            res.render('userData.ejs', {users: foundUsers});
            //JSON Format
            //res.json(foundUsers);
        }
    })
};

function invalidPage(req, res){
    res.redirect('/');
};

module.exports = {
    isLoggedIn          : isLoggedIn,
    indexPage           : indexPage,
    registerPage        : registerPage,
    postRegisterPage    : postRegisterPage,
    loginPage           : loginPage,
    postLoginPage       : postLoginPage,
    logoutPage          : logoutPage,
    usersPage           : usersPage,
    invalidPage         : invalidPage
}

