/**
 * Created by Steven on 12/20/2016.
 */

var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var engine = require('ejs-mate');
var passport = require('passport');
var auth = require('./routes/auth');

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('/views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoed({extended: false}));
app.use('/public', express.static('public'));
app.use(session({
    secret: 'eiGames',
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 86400000, httpOnly: false, secure: false}
}));
app.use(passport.initialize());
app.use(passport.session());
auth.init(passport);
app.use('/auth',auth.route);

app.listen(3000, function () {
    console.log("Listening on Port 3000")
});