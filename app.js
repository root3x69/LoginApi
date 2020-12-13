require('dotenv/config');
const   express       = require('express'),
        app           = express(),
        bodyParser    = require('body-parser'),
        mongoose      = require('mongoose'),
        User          = require('./models/user'),
        passport      = require('passport'),
        LocalPassport = require('passport-local')

const   userRoutes    = require('./controllers/user/routes');

/****************
 * MongoDB Setup
****************/
mongoose.connect(process.env.MONGO_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, () => {
    console.log('Connected to DB');
});

//Express sessions
app.use(require('express-session')({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

//Passportjs Setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalPassport(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
});

//User Routes
app.use(userRoutes);

/****************
 * Server Port
****************/
app.listen(process.env.PORT, () => {
    console.log(`Server has started at PORT : ${process.env.PORT}`);
});