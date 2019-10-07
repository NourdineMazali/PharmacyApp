const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);

const app = express();
//
// Configuring the database
const dbConfig = require('./config/db.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url)
    .then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

let db = mongoose.connection;

//use sessions for tracking logins
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

let cors = require('cors');

// use it before all route definitions
app.use(cors({origin: 'http://localhost:9080'}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Require Supplies routes
require('./app/routes/supply.routes.js')(app);
// Require Patient routes
require('./app/routes/patient.routes.js')(app);
// Require Medicine routes
require('./app/routes/medicine.routes.js')(app);
require('./app/routes/patient_medicines.routes.js')(app);
require('./app/routes/medicine_supplies.routes.js')(app);
// Require Pharmacy routes
require('./app/routes/pharmacy.routes.js')(app);
// Require Auth routes
require('./app/routes/auth.routes.js')(app);

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Staged Supply Api application."});
});

// listen for requests
app.listen(3001, () => {
    console.log("API server is listening on port 3001");
});