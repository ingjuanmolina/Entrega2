//Entry App Point

//Variables used to manage express
const express = require('express');
const app = express();

const path = require('path'); //Variable to handle path package features

const hbs = require('hbs'); //Variable to handle hbs package features

require('./helpers');

//Used to read data from POST method
const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({extended: false}));

//Public directory config
const publicDirectory = path.join(__dirname,'../public');
app.use(express.static(publicDirectory));

//Partials directory config
const partialsDirectory = path.join(__dirname, '../partials');
hbs.registerPartials(partialsDirectory);

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Inicio'
    });
});

app.get('/crear', (req, res) => {
    res.render('createCourse', {
        title: 'Administrar Cursos'
    });
});

app.get('/cursos', (req, res) => {
    res.render('listarcursos', {
        title: 'Cursos'
    });
});

app.post('/createCourse', (req, res) => {
    console.log(req.body);
    res.render('showCourseList', {
        title: 'Cursos'
    });
})

console.log(__dirname);

//Opens port 3000 listening
app.listen(3000, () => {
    console.log('Escuchando en el puerto 3000');
});
