//depencies
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ContactUs = require('./models/contactUsModel');
const RegisterArtist = require('./models/artistModel');
const AdminAccount = require('./models/adminModel');
const env = require('dotenv');
const multer = require('multer');
const sessions = require('express-session');
const cookieParser = require('cookie-parser');
var fs = require('fs');
const { startSession } = require('./models/contactUsModel');
const flash = require('connect-flash');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
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

mongoose.connection
    .on('open', () => {
        console.log('Mongoose connection open');
    })
    .on('error', (err) => {
        console.log(`Connection error : ${err.message}`);
    });

//configurations or settings
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = moment;

app.get('/', (req, res) => {
    res.render('home', {
        user: { name: 'Odeke Trevor', age: 24 },
    });
});

app.use('/', artistRoutes);
app.use('/password', require('./routes/CreatePassword'));
app.use('/users', require('./routes/users'));
app.use('/test', require('./routes/profile'));
app.use('/bands', require('./routes/bands'));
app.use('/comedians', require('./routes/comedians'));
app.use('/admin', require('./routes/admin'));

app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/views/contact.html');
});

app.get('/profile', (req, res) => {
    if (req.session.userid) {
        res.redirect('/login');
    } else if (req.session) {
        try {
            RegisterArtist.findOne(
                {
                    username: session.userid,
                },
                function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Here we are');
                        res.render('profile', {
                            user: data,
                        });
                        // console.log(data);
                    }
                }
            );
        } catch (err) {
            console.log(err);
        }
    }
});


//single user page
app.get('/artists/:id', (req, res) => {
    RegisterArtist.find({ artist: req.params.id }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.render('artist-detail', {
                user: data,
            });
        }
    });
});

// app.get('/login', (req, res) => {
//     res.render('login', {
//         info: {
//             success: false,
//         },
//     });
// })

app.get('/login', (req, res) => {
    res.render('login', {
        info: {
            success: true,
        },
    });
})

app.post('/login', async (req, res) => {
    // const login = new LoginUser(req.body);
    // login.save((error, savedUser) => {
    //     if (error) throw error;
    //     res.json(savedUser);
    // });
    try {
        const checkUser = await RegisterArtist.findOne({
            username: req.body.username,
            password: req.body.password,
        });

        const checkAdmin = await AdminAccount.findOne({
            username: req.body.username,
        });

        if (checkUser) {
            console.log('User exists');
            if (checkUser.role == 'viewer') {
                console.log(checkUser.stagename);
                session = req.session;
                session.userid = checkUser.username;
                console.log(req.session);
                res.redirect('/profile');
            }
        } else if (checkAdmin) {
            console.log(checkAdmin.email);
            session = req.session;
            session.userid = checkAdmin.username;
            res.redirect('/register/artists');
        } else {
            res.render('login', {
                info: {
                    success: false,
                },
            });
        }
    } catch {
        res.send('Internal server error');
    }
});

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

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.get('/bands', (req, res) => {
    res.sendFile(__dirname + '/views/bands.html');
});



app.get('/admin', (req, res) => {
    RegisterArtist.find({}, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            var img = data[0].img;
            console.log(img);
            res.render('admin', {
                user: data,
            });
            // console.log(data);
        }
    });
});



app.get('*', (req, res) => {
    res.status(404).send('Page does not exist');
});

app.listen(port, () => {
    console.log(`We are running on port ${port}`);
});
