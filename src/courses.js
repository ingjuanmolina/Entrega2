const fs = require('fs'); //Manage File Systems features

let inscriptions = [];

let message = "";

const create = (inscription) => {

    list(); //Loads json content and saves it in the array

    let newInscription = {
        studentid: inscription.studentid,
        studentname: inscription.studentname,
        studentmail: inscription.studentmail,
        studentphone: inscription.studentphone,
        coursename: inscription.coursename,
    }

    let duplicated = inscriptions.find(i => (i.studentId === inscription.studentId &&
        i.coursename === inscription.coursename));

    if (duplicated)
        message = inscription.studentname + ', ya estás inscrito en el curso de ' + inscription.coursename;
    else {
        inscriptions.push(newInscription);
        message = inscription.studentname + ', te has inscrito correctamente en el curso de ' + inscription.coursename;
        save();
    }

    return message;
}//End of create

const list = () => {

    try {
        inscriptions = require('./inscription.json');

        //listaEstudiantes = JSON.parse(fs.readFileSync('listado.json'));        
    } catch (error) {
        inscriptions = [];
    }

}

const save = () => {
    let data = JSON.stringify(inscriptions);


    fs.writeFile('./src/inscription.json', data, (err) => {
        if (err) throw (err);
        console.log('Registro guardado con éxito');
        console.log(inscriptions);
    })
}

const update = (name, id) => {
    list(); //Initializes courses array from json object

    inscriptions = inscriptions.filter(i => !(i.studentid === id &&
        i.coursename === name)); //Search for a course with the given name

    //console.log(inscriptions);

    save(); //Updates json file

    console.log("After Update");

}//Fin de actualizar

module.exports = {
    create,
    update
}