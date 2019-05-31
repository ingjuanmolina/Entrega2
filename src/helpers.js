const hbs = require('hbs'); //Variable to handle hbs package features

hbs.registerHelper('showAvailableCourseList', () => {
    let courseList = require('./data.json');

    let output = ''; //output from json object

    courseList.forEach(course => {
        //Add course info only if state is available
        if (course.state === 'disponible') {
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
});//End of registerHelper showCollapseCourse

hbs.registerHelper('courseNames', () => {
    let courseList = require('./data.json');

    let output = ''; //output from json object

    let i = 1

    courseList.forEach(course => {
        output = output +`<option value='${course.name}'>${course.name}</option>`
        i++;
    });

    return output;
});//End of registerHelper showCollapseCourse