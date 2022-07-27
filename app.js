var createError = require('http-errors');

var express = require('express');
var path = require('path');
var logger = require('morgan');
const dotenv = require('dotenv');
const fileupload = require('express-fileupload')
const expressLayout = require('express-ejs-layouts')
const session = require('express-session')
const flash = require('connect-flash')

var clientRouter = require('./routes/patient');
var adminRouter = require('./routes/admin');
var medecinRouter = require('./routes/medecin');

var app = express();
var http = require('http').Server(app); var io = require('socket.io')(http)
dotenv.config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', './layouts/fullwith') 

app.use(fileupload())
app.use(flash())
app.use(session({

    secret : process.env.SECRET_SESSION, 
    resave : 'false',
    saveUninitialized : true  ,
    cookie :  {secure : false}
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('images'));
app.use(expressLayout)

app.use('/patient', clientRouter);
app.use('/', adminRouter);
app.use('/medecin', medecinRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

/*const  URL = ['login','register', 'Dashboard' ,'new_hospital','new_doctor','list_consult'] ;

app.use((req, res) =>{

    let url = req.url ; 
    console.log(req.url);
})
*/
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


/*
io.on('connection', client =>{
    console.log(client.id)
    client.on('image', data =>{

        const image = fs.readFileSync('../images/oeil_droit.png');

        console.log(data)

        client.emit('broadcast', image);
    })
})*/

module.exports = app;