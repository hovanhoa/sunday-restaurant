const express = require('express');
const path = require('path');
const app = express();
const expresshbs = require('express-handlebars');
const route = require('./routes');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const hostName = 'localhost';
const port = 3040;

// Body-parser - Get data from client submit to browser
app.use(
    express.urlencoded({
        extended: true,
    })
);
// app.use(express.json());
app.use(cookieParser());

//------------------ STORE IN COOKIES -----------------------
app.use(session({
    cookie: { maxAge: 3 * 24 * 60 * 60 * 1000 },
    secret: "S3cret",
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});
// ----------------------------------------------------
// For upload file to dbp
app.use(fileUpload());

var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars)

//--- TEMPLATE ENGINE -------------------------------------
app.engine('hbs', expresshbs({
    extname: '.hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/resources/views/layouts/',
    partialsDir: __dirname + '/resources/views/partials/',
    helpers: {
        mul: function (a, b) { return a * b; },
        sum: function (a, b) { return a + b; },
        formatCurrency: function (num) {
            //======================================
            // FORMAT CURRENCY BEFORE SHOW OUT
            //======================================
            const formatter = new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND"
            });

            return formatter.format(num);

        },
        formatTime: function (time) {
            return moment(new Date(time)).fromNow();
        },
        equal: function (a, b) { return a == b; }
    }
}));
app.set('view engine', 'hbs');
//---------------------------------------------------------

// Directory to views folder
app.set('views', path.join(__dirname, 'resources/views'));

// Use public document like CSS, JS, IMG, FONT,...
app.use(express.static(path.join(__dirname, '/public')));

// Route to pages
route(app);


app.listen(port, hostName, () => console.log(`Server is listening from ${hostName} at port: ${port}`));
