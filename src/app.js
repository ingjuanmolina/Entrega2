//Entry App Point

//Variables used to manage express
const express = require('express');
const app = express();

const path = require('path'); //Variable to handle path package features

const hbs = require('hbs'); //Variable to handle hbs package features

const functions = require('./functions'); //Variable to manage operations over json file

const inscriptions = require('./courses'); //Variable to manage inscriptions over json file

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

app.get('/administrar', (req, res) => {
    res.render('manageCourses', {
        title: 'Administrar Cursos'
    });
});

app.get('/cursos', (req, res) => {
    res.render('collapsedcourselist', {
        title: 'Cursos'
    });
});

app.get('/matricular', (req, res) => {
    res.render('inscription', {
        title: 'inscripción de Cursos'
    });
});

app.get('/inscripciones', (req, res) => {
    res.render('manageInscriptions', {
        title: 'Administración de inscripciones'
    });
});

app.post('/createCourse', (req, res) => {

    //Create a new course object
    let course = {
        id: req.body.courseid,
        name: req.body.coursename,
        description: req.body.coursedescription,
        value: req.body.coursevalue,
        mode: req.body.coursemode,
        hours: req.body.coursehours,
        state: req.body.cousestate
    }

    functions.create(course); //Pass course object to create function

    res.render('showAvailableCourseList', {
        title: 'Cursos disponibles'
    });
});

app.post('/updateCourse', (req, res) => {

    //Create a new course object
    let name = req.body.coursename;

    functions.update(name); //Pass course object to create function

    res.render('manageCourses', {
        title: 'Administrar Cursos'
    });
});


app.post('/inscription', (req, res) => {
    console.log(req.body);

    //Create a new inscription object
 
    let inscription = {
        studentid: req.body.studentId,
        studentname: req.body.studentname,
        studentmail: req.body.studentmail,
        studentphone: req.body.studentphone,
        coursename: req.body.coursename,
    }

    let message = inscriptions.create(inscription); //Pass course object to create function

    res.render('inscriptionresult', {
        title: 'Inscripción al curso',
        result: message
    });
});//End of POST inscription

//Opens port 3000 listening
app.listen(3000, () => {
    console.log('Escuchando en el puerto 3000');
});

app.post('/updateInscription', (req, res) => {

    //Create a new course object
    let name = req.body.coursename;
    let id = req.body.studentid;

    inscriptions.update(name, id); //Pass course object to create function

    res.render('manageInscriptions', {
        title: 'Administrar Inscripciones'
    });
});
