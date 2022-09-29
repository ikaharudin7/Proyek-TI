const flash = require('express-flash')
const session = require('express-session')
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 8080;
const bodyParser = require("body-parser");


require('./models');

// USE commands
app.use(cors());
app.use(express.json()) // needed if POST data is in JSON format
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
)
  
app.use('/profile', require("./routes/profile"));

app.use('/signup', require("./routes/signup"));

// Flash messages for failed logins, and (possibly) other success/error messages
app.use(flash())

// Track authenticated users through login sessions
app.use(
    session({
      // The secret used to sign session cookies (ADD ENV VAR)
        secret: process.env.SESSION_SECRET || 'keyboard cat',
        name: 'demo', // The cookie name (CHANGE THIS)
        saveUninitialized: false,
        resave: false,
        cookie: {
            sameSite: 'strict',
            httpOnly: true,
            secure: app.get('env') === 'production'
        },
    })
  )

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
}

// Initialise Passport.js
const passport = require('./passport')
app.use(passport.authenticate('session'));

app.use('/login', require("./routes/auth"));

// Connect to the database
mongoose.connect('mongodb+srv://josh:test123@cluster0.jvj0nic.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
  
// Test if the connection was made
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));