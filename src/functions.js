const fs = require('fs'); //Manage File Systems features

let courseList = [];

const create = (course) => {

    list(); //Loads json content and saves it in the array

    let newCourse = {
        id: course.id,
        name: course.name,
        description: course.description,
        value: course.value,
        mode: course.mode,
        hours: course.hours,
        state: course.state,
    };

    let duplicated = courseList.find(c => c.id == course.id);

    if(duplicated)
        console.log('Ya existe un curso con ese ID');
    else{
        courseList.push(newCourse); 
        //console.log(courseList);
        save();
    }
}

const list = () => {

    try {
        courseList = require('./data.json');

        //listaEstudiantes = JSON.parse(fs.readFileSync('listado.json'));        
    } catch (error) {
        courseList = [];
    }

}

const save = () => {
    let data = JSON.stringify(courseList);
    
    
    fs.writeFile('./src/data.json', data, (err) => {
        if (err) throw (err);
        console.log('Registro guardado con éxito');
    })
}


const actualizar = (nombre, asignatura, calificacion) => {
    list(); //Inicializa el array de estudiantes desde listado.json

    let estBuscado = courseList.find( buscado => buscado.nombre === nombre); //Busca un estudiante con base en el nombre   

    if(estBuscado === undefined){
        console.log('El estudiante ' + nombre + ' no se encuentra registrado');
    }
    else{
        estBuscado[asignatura] = calificacion;

        save();
    }

}//Fin de actualizar

const eliminar = (nombre) => {
    list();

    let disponibles = courseList.filter(est => est.nombre != nombre);

    if(disponibles.length == courseList.length)
        console.log('No se encontró al estudiante ' + nombre);
    else{
        courseList = disponibles;

        save();
    }
}

module.exports = {
    create,
    actualizar, 
    eliminar
}