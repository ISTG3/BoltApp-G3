const { now } = require("d3-timer");
const e = require("express");

const server = "http://localhost:3000";
var runType, runTime, runDate;



function addRun() {
    // this url might be different 'cause of hbs. 
    const url = server + '/runs'
    const run = { runType: runType, runTime: runTime, runDate: runDate };
    const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(run)

        }
        // what the hell is this function? might be an express fn
    const response = await fetch(url, options)
}



function fetchRuns() {
    const url = server + '/runs'
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'applications/json'
        }
    }
    const response = await fetch(url, options)
    const runs = await response.json()
    populateRuns(runs)

}



// async function fetchStudents() {
//     const url = server + '/students';
//     const options = {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json'
//         }
//     }
//     const response = await fetch(url, options);
//     const students = await response.json();
//     populateContent(students);
// }


// function populateContent(students) {
//     var table = document.getElementById('content');
//     table.innerHTML = "<tr><th>Student Id</th><th>Full Name</th></tr>";
//     students.forEach(student => {
//         var row = document.createElement('tr');
//         var dataId = document.createElement('td');
//         var textId = document.createTextNode(student.id);
//         dataId.appendChild(textId);
//         var dataName = document.createElement('td');
//         var textName = document.createTextNode(student.name);
//         dataName.appendChild(textName);
//         row.appendChild(dataId);
//         row.appendChild(dataName);
//         table.appendChild(row);
//     });
// }

function populateRuns(runs) {
    var record = document.getElementById('atheleterecord')
    runs.forEach(run => {
        // create form
        var form = document.createElement('form');
        form.setAttribute('method', 'post')

        //create runType input
        var runType = document.createElement('input')
        runType.setAttribute('type', 'text');
        runType.setAttribute('value', run.runType)

        //create runTime input
        var runTime = document.createElement('input')
        runTime.setAttribute('type', 'number');
        runTime.setAttribute('value', run.runTime)

        //create runDate input
        var runDate = document.createElement('input')
        runDate.setAttribute('type', 'date')
        runDate.setAttribute('value', run.runDate)

        //create a saveChanges button
        var save = document.createElement('input')
        save.setAttribute('type', 'submit')
        save.setAttribute('value', 'Save Changes')

        // Append inputs to our form
        form.appendChild(runType)
        form.appendChild(runType)
        form.appendChild(runDate)
        form.appendChild(save)

        //Append form to the record
        record.appendChild(form)
    })


}




document.querySelector('form').addEventListener('submit', (e) => {
    runType = document.getElementById('runType').value;
    runTime = document.getElementById('runTime')
    runDate = document.getElementById('runDate').value;
    if (!runDate) runDate = Date(now)
    if (runType && runTime && runDate)
        runType = parseInt(runType)
    runTime = parseFloat(runTime)
    runDate = Date.parse(runDate)
    addRun()
    fetchRuns()

    e.preventDefault();
});