//var request = require('request');
//const request = require('postman-request');
const mySecret = "secret"
const express = require('express');
const app = express();
const path = require('path');
var favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
const bodyParser = require('body-parser');

const db = require('./queries')
//import "queries.js" as db;


var cookieParser = require('cookie-parser');
app.use(cookieParser(mySecret));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'tut1')));
app.use(express.static(path.join(__dirname, 'ajax')));


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
//new thing
//JSON object to be added to cookie
let users = {
name : "editor",

}

//Route for adding cookie
app.get('/setuser', (req, res)=>{
res.cookie("userData", users);
res.send('user data added to cookie');
});

//Iterate users data from cookie
app.get('/getuser', (req, res)=>{
//shows all the cookies
res.send(req.cookies);
});

app.get('/datatest', function(req, res) {
    res.sendFile(path.join(__dirname+'/DataTest.html')) // this is the ONLY way to send html files #!
});

app.get('/resources', function(req, res) {
    res.send(resources);
});



app.get('/', (req, res) => {
	res.render('index');
	console.log('Cookies: ', req.cookies)
});

app.get('/newpage', (req, res) => {
	res.render('newpage');

});

app.get('/tut1', (req, res) => {
    //path.join(__dirname, 'tut1')
    res.sendFile(path.join(__dirname+'/tut1/index2.html'))
});

app.get('/something', function(req, res) {
    //path.join(__dirname, 'tut1')
    res.sendFile(path.join(__dirname+'/ajax/members.html'))
});

app.get('/testDNS', function(req, res) {
    //path.join(__dirname, 'tut1')
    res.sendFile(path.join(__dirname+'/ajax/testDNS.html'))
});


app.get('/cookie', (req, res) => {
  res
    .cookie('foo', 'bar', { signed: true })
    .send();
})

app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.post ('/test', db.testUser );

//app.post('/test', function (req, res) {
//  db.testUser
//})


app.delete('/users/:id', db.deleteUser)

const port = 3000;
const server = app.listen(port, () => {
	console.log('listening on http://localhost:${port}');
});
