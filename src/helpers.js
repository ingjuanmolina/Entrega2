const hbs = require('hbs'); //Variable to handle hbs package features

hbs.registerHelper('showAvailableCourseList', () => {
    let courseList = require('./data.json');

    let output = ''; //output from json object

    courseList.forEach(course => {
        //Add course info only if state is available
        if (course.state === 'Disponible') {
            output = output +
                `<tr>
                <td>${course.id}</td>
                <td>${course.name}</td>
                <td>${course.description}</td>
                <td>${course.value}</td>
                <td>${course.mode}</td>
                <td>${course.state}</td>
            </tr>`
        }

    });

    return output;
});//End of registerHelper showCourseList

hbs.registerHelper('showFullCourseList', () => {
    let courseList = require('./data.json');

    let output = ''; //output from json object

    courseList.forEach(course => {
        //Add course info only if state is available
        output = output +
            `<tr>
                <td>${course.id}</td>
                <td>${course.name}</td>
                <td>${course.description}</td>
                <td>${course.value}</td>
                <td>${course.mode}</td>
                <td>${course.state}</td>
            </tr>`
    });

    return output;
});//End of registerHelper showCourseList

hbs.registerHelper('showCollapseCourse', () => {
    let courseList = require('./data.json');

    let output = ''; //output from json object

    let i = 1

    courseList.forEach(course => {

        if (course.state === 'Disponible') {


            output = output +
                `
    <div class="accordion" id="accordionExample">
        <div class="card">
            <div class="card-header" id="heading${i}">
            <h2 class="mb-0" style="text-color: black;">
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapseOne" style="color:black; font-weight: bold;">
                Curso: ${course.name} - ${course.description}. $ ${course.value}.
                </button>
            </h2>
            </div>

            <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" aria-expanded="false" data-parent="#accordionExample">
                <div class="card-body">
                    ${course.description}. Curso de modalidad ${course.mode}, con una duración de ${course.hours} horas.
                </div>
            </div>
        </div>
    </div>
    `
        }
        i++;

    });

    return output;
});//End of registerHelper showCollapseCourse

hbs.registerHelper('courseNames', () => {
    let courseList = require('./data.json');

    let output = ''; //output from json object

    let i = 1

    courseList.forEach(course => {
        output = output + `<option value='${course.name}'>${course.name}</option>`
        i++;
    });

    return output;
});//End of registerHelper showCollapseCourse

hbs.registerHelper('showCollapseInscriptions', () => {
    let inscriptions = require('./inscription.json');
    let courses = require('./data.json');

    let output = ''; //output from json object

    let i = 1

    courses.forEach(course => {

        let foundInscriptions = inscriptions.filter(i => i.coursename === course.name);
        
        output += 
        `
        <div class="accordion" id="accordionExample">
            <div class="card">
                <div class="card-header" id="heading${i}">
                    <h2 class="mb-0">
                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapseOne" style="color:black; font-weight: bold;">
                        ${course.name}
                        </button>
                    </h2>
                </div>
                <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" aria-expanded="false" data-parent="#accordionExample">
                    <div class="card-body">
        `
        if (foundInscriptions.length > 0){
            output +=
            `
            <form action="/updateInscription" method="POST">
            <table class="table table-bordered table-sm">
                <thead class="table-dark">
                    <tr>
                        <td>id</td>
                        <td>Nombre</td>
                        <td>Email</td>
                        <td>Teléfono</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>

            `;
            foundInscriptions.forEach(ins => {
                output += 
                    `
                            <tr>
                                <td>${ins.studentid}</td>
                                <td>${ins.studentname}</td>
                                <td><a href="mailto:${ins.studentmail}">${ins.studentmail}</td>
                                <td>${ins.studentphone}</td>
                                <td>
                                    <input type="hidden" value="${ins.studentid}" name="studentid"/>
                                    <input type="hidden" value="${ins.coursename}" name="coursename"/>
                                    <button type="submit" class="btn btn-danger">Eliminar</button>
                                </td>
                            </tr>
                `;
            });

            output += 
            `
                    </tbody>
                </table>
            </form>

            `;

        }

        output += 
        `
                    </div>
                </div>
            </div>
        </div>
        `
        i++;

    });

    return output;
});//End of registerHelper showCollapseInscriptions