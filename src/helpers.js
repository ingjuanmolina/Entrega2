const hbs = require('hbs'); //Variable to handle hbs package features

hbs.registerHelper('showCourseList', () => {
    let courseList = require('./data.json');
    
    let output = ''; //output from json object

    courseList.forEach(course => {
        output = output +
    `<tr>
        <td><a href="/listar?id=${course.id}">${course.id}</a></td>
        <td>${course.name}</td>
        <td>${course.description}</td>
        <td>${course.value}</td>
        <td>${course.mode}</td>
        <td>${course.state}</td>
    </tr>`
    });

    console.log(output);
    return output;
});//End of registerHelper listar

hbs.registerHelper('showCollapseCourse', () => {
    let courseList = require('./data.json');
    
    let output = ''; //output from json object

    let i = 1

    courseList.forEach(course => {
        output = output +
    `
    <div class="accordion" id="accordionExample">
        <div class="card">
            <div class="card-header" id="heading${i}">
            <h2 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapseOne">
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
        i++;
    });

    return output;
});//End of registerHelper listarcollapse