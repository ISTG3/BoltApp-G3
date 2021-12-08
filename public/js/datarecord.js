const server = "http://localhost:3000";
var runType;
var runTime;
var runDate;



async function fetchRuns() {

    const url = server + '/runs';
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }
    const response = await fetch(url, options);
    const runs = await response.json();
    populateRuns(runs);

}

async function addRun() {

    const url = server + '/runs';
    const run = { runType: runType, runTime: runTime, runDate: runDate };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(run)

    }
    const response = await fetch(url, options);
}

// function populateRuns(runs) {
//     var record = document.getElementById('atheleterecord')
//     runs.forEach(run => {
//         // create form
//         var form = document.createElement('form');
//         form.setAttribute('method', 'post')

//         //create runType input
//         var runType = document.createElement('input')
//         runType.setAttribute('type', 'text');
//         runType.setAttribute('value', run.runType)

//         //create runTime input
//         var runTime = document.createElement('input')
//         runTime.setAttribute('type', 'number');
//         runTime.setAttribute('value', run.runTime)

//         //create runDate input
//         var runDate = document.createElement('input')
//         runDate.setAttribute('type', 'date')
//         runDate.setAttribute('value', Date(run.runDate))


//         //create a saveChanges button
//         var save = document.createElement('input')
//         save.setAttribute('type', 'submit')
//         save.setAttribute('value', 'Save Changes')

//         // Append inputs to our form
//         form.appendChild(runType)
//         form.appendChild(runTime)
//         form.appendChild(runDate)
//         form.appendChild(save)

//         //Append form to the record
//         record.appendChild(form)
//     });

// }


document.querySelector('#form').addEventListener('submit', (e) => {
    runType = document.getElementById('runType').value;
    runTime = document.getElementById('runTime').value;
    runDate = document.getElementById('runDate').value;
    console.log(typeof(runDate))


    if (runType && runTime && runDate) {
        runType = parseInt(runType)
        runTime = parseFloat(runTime)
        runDate = Date.parse(runDate)
        addRun();
        fetchRuns();
    }

    e.preventDefault();
});



var selectedRow = null;

function onFormSubmit(e) {
    event.preventDefault();
    var formData = readFormData();
    if (selectedRow === null) {
        insertNewRecord(formData);
    } else {
        updateRecord(formData);
    }
    resetForm();
}

//Retrieve the data
function readFormData() {
    var formData = {};
    formData["firstName"] = document.getElementById("firstName").value;
    formData["raceLocation"] = document.getElementById("raceLocation").value;
    formData["raceType"] = document.getElementById("raceType").value;
    formData["Time"] = document.getElementById("Time").value;
    return formData;
}

//Insert the data
function insertNewRecord(data) {
    var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.firstName;
    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.raceLocation;
    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.raceType;
    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.Time;
    var cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<button onClick='onEdit(this)'>Edit</button> <button onClick='onDelete(this)'>Delete</button>`
}

//Edit the data
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById('firstName').value = selectedRow.cells[0].innerHTML;
    document.getElementById('raceLocation').value = selectedRow.cells[1].innerHTML;
    document.getElementById('raceType').value = selectedRow.cells[2].innerHTML;
    document.getElementById('Time').value = selectedRow.cells[3].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.firsttName;
    selectedRow.cells[1].innerHTML = formData.raceLocation;
    selectedRow.cells[2].innerHTML = formData.raceType;
    selectedRow.cells[3].innerHTML = formData.Time;
}

//Delete the data
function onDelete(td) {
    if (confirm('Do you want to delete this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById('storeList').deleteRow(row.rowIndex);
    }
    resetForm();
}

//Reset the data
function resetForm() {
    document.getElementById('firstName').value = '';
    document.getElementById('raceLocation').value = '';
    document.getElementById('raceType').value = '';
    document.getElementById('Time').value = '';
}