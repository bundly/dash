const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

// Passport config
require('./config/passport')(passport);

// Connect to Mongo
mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true })
    .then(console.log("MongoDB Connected"))
    .catch(err => console.log(err));

//EJS
app.use(expressLayouts);

// Bodyparser 
app.use(express.urlencoded({extended: false}));

// Express Session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

app.use(passport.initialize()); 
app.use(passport.session());    

// Connect Flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
