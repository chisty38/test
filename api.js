const cookieSession = require("cookie-session");
var express = require('express');
var cors = require('cors');
var router = express.Router();
const passportSetup = require("./passport");
const passport = require("passport");
var dboperations = require('./dbOperation');
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
let http = require('http');
var app = express();
var bodyParser = require('body-parser');
const { RequestError } = require('mssql');
var LocalStrategy = require('passport-local');
const flash = require('express-flash');
var enforce = require('express-sslify');
require('dotenv').config();


app.use(
    cookieSession({ name: "session", keys: ["testSession"], maxAge: 24 * 60 * 60 * 100 }) //one day
  );

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//app.enable("trust proxy");
//app.use(enforce.HTTPS());



const CLIENT_URL = 'http://localhost:3000/';
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//app.use(cors());
app.use(
    cors({
      origin: 'http://localhost:3000',
      //origin: `${process.env.Prod_Url_origin}`,
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );
//app.use('/apiInventory', router);
app.use('/testapi', router);

router.use((request, response, next) => {
    //console.log('middleware called . .');
    next();
});

router.route('/hello').get((req, res)=> {
    res.status(200).json('hello');
})


router.route('/getshipmentStatusbydate/:from/:to').get((req, res)=> {
    dboperations.getSalesReportLogByDate(req.params.from, req.params.to).then(result => {
        console.log('getSalesReportLogByDate called ');
        //console.log(result);
    res.json(result);
    })
})



var port = process.env.PORT || 5000;
app.listen(port);
console.log('test API running at ' + port);

const path = require('path');
const reactBuild = path.join(__dirname, 'client', 'build');
app.use(express.static(reactBuild));

app.get('*', async(req, res) => 
{
    res.sendFile(path.join(reactBuild, 'index.html'));
})
