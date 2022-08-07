//depencies
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const RegisterArtist = require('./models/artistModel');
const multer = require('multer');
const sessions = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require('passport');
const moment = require('moment')

const artistRoutes = require('./routes/RegisterArtists');

require('dotenv').config();
// var passport = require('passport'),
//     LocalStrategy = require('passport-local').Strategy;

// const initialisePassport = require('./passport-config');
// initialisePassport(passport, (email) =>
//     users.find((user) => user.email === email)
// );

//Passport config 
require('./config/passport')(passport)

//instanciations
const app = express();
const port = 3000;
const oneDay = 1000 * 60 * 60 * 24;
app.use(
    sessions({
        secret: 'thisismysecretketdsfasdf',
        saveUninitialized: true,
        cookie: { maxAge: oneDay, secure: false },
        resave: false,
    })
);
// console.log(process.env.DATABASE);

var session;

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Connect flash
app.use(flash());

//Global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next()
})

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.use(cookieParser());

//Setting multer
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        var images = file.fieldname;
        console.log(images);
        cb(null, file.fieldname + '-' + Date.now());
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
});

// var upload = multer({ storage: storage });

//Middleware
app.use(express.urlencoded({ extended: true }));
// passport.use(RegisterArtist.createStrategy());
// passport.serialize(RegisterArtist.serializeUser());
// passport.deserialize(RegisterArtist.deserializeUser());

// app.use(expressSession);
// app.use(passport.initialize());
// app.use(passport.session());

mongoose.connect(
    process.env.DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
    },
    (err) => {
        if (err) throw err;
        console.log('Connected');
    }
);
 
//configurations or settings
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = moment;

app.get('/', (req, res) => {
    res.render('home', {
        user: { name: 'Odeke Trevor', age: 24 },
    });
});


//Routes
app.use('/', artistRoutes);
app.use('/password', require('./routes/CreatePassword'));
app.use('/users', require('./routes/users'));
app.use('/profile', require('./routes/profile'));
app.use('/bands', require('./routes/bands'));
app.use('/comedians', require('./routes/comedians'));
app.use('/admin', require('./routes/admin'));
app.use('/contact', require('./routes/contactUs'));


app.get('/login', (req, res) => {
    res.render('login', {
        info: {
            success: true,
        },
    });
})



app.get('/changepassword/:id', async (req, res) => {
    await RegisterArtist.findOne({
        artistid: req.params.id,
    })
        .then((data) => {
            if (data.password != 'password') {
                res.redirect('/login');
            } else {
                res.render('setpassword', {
                    info: {
                        success: false,
                    },
                });
            }
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post('/changepassword/:id', async (req, res) => {
    const checkUser = await RegisterArtist.findOne({
        artistid: req.params.id,
    });

    if (checkUser) {
        const newUser = await RegisterArtist.findOne({
            artistid: req.params.id,
            password: 'password',
        });
        if (newUser) {
            res.redirect('/login');
        } else if (req.body.password1 == 'password') {
            console.log('please provide a better password');
            res.render('setpassword', {
                info: {
                    success: false,
                },
            });
        } else {
            await RegisterArtist.updateOne(
                { artistid: req.params.id },
                { password: req.body.password1 }
            )
                .then((result) => {
                    console.log(result);
                    if (result.modifiedCount > 0) {
                        console.log('success');
                        res.redirect('/login');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
});


//Handles routes to pages that do not exist
app.get('*', (req, res) => {

    res.render('404');
});

app.listen(port, () => {
    console.log(`We are running on port ${port}`);
});
