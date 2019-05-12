let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');


// defining routes
let login = require('./routes/login');
let signup = require('./routes/signup');
let data = require('./routes/data');

let app = express();

app.use((req, res, next) => {
    // any app can access my resorce 
    res.setHeader("Access-Control-Allow-Origin", "*");
    // SET HEADERS
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Origin,X-Requested-With,Content-Type,Accept");
    // set methods
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    next();
})

//  connecting mongoose
let db = require('./config/database')
mongoose.connect(db.MongoURI, { useNewUrlParser: true }, (err) => {
    if (!err) console.log('Connected to MongoDB')
})
//  bp middleware
app.use(bodyParser.json())

//  using routes
app.use('/login', login);
app.use('/signup', signup);
app.use('/data', data);

let PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})