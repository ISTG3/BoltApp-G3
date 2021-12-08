import { graphData } from "./data.js";

const server = "http://localhost:3000";
var nextId = 0;
// var formData = { "raceDate": "", "raceLocation": "", "raceType": "", "raceTime": "" }

// Becomes non null only when the user edits a row in the table
var selectedRow = null;

window.onload = function() {
    fetchRaces();
}

export async function fetchRaces() {

    const url = server + '/races';
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }
    const response = await fetch(url, options);
    const races = await response.json();
    nextId = races.length()
    console.log(nextId);
    populateraces(races);
    graphData(races)

}

async function addrace(race) {

    const url = server + '/races';
    // const race = { raceDate: race.raceDate, raceLocation: race.raceLocation, raceType: race.raceType, raceTime: race.raceTime };
    // const race = race;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(race)

    }
    const response = await fetch(url, options);
}


document.querySelector('#raceform').addEventListener('submit', (e) => {
    var race = readFormData()

    if (race.raceType && race.raceTime && race.raceDate) {
        // potential source of error...
        var backendEntry = {
            "raceDate": Date.parse(race.raceDate),
            "raceLocation": race.raceLocation,
            "raceType": parseInt(race.raceType),
            "raceTime": parseFloat(race.raceTime)
        }
        console.log(backendEntry);
        addrace(backendEntry);
        graphData()
            // fetchRaces();

        if (selectedRow === null) {
            insertNewRecord(backendEntry);
        } else {
            updateRecord(race);
        }
        resetForm();
    }


    e.preventDefault();
});

//Retrieve the data
function readFormData() {
    var formData = {};
    formData["raceDate"] = document.getElementById("raceDate").value;
    formData["raceLocation"] = document.getElementById("raceLocation").value;
    formData["raceType"] = document.getElementById("raceType").value;
    formData["raceTime"] = document.getElementById("raceTime").value;
    return formData;
}

//Insert the data
function insertNewRecord(data) {
    var date = new Date(data.raceDate).toLocaleDateString("es-CL")
    var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = date;
    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.raceLocation;
    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.raceType;
    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.raceTime;
    var cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<button onClick='onEdit(this)'>Edit</button> <button onClick='onDelete(this)'>Delete</button>`
}

//Edit the data
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById('raceDate').value = selectedRow.cells[0].innerHTML;
    document.getElementById('raceLocation').value = selectedRow.cells[1].innerHTML;
    document.getElementById('raceType').value = selectedRow.cells[2].innerHTML;
    document.getElementById('raceTime').value = selectedRow.cells[3].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.raceDate;
    selectedRow.cells[1].innerHTML = formData.raceLocation;
    selectedRow.cells[2].innerHTML = formData.raceType;
    selectedRow.cells[3].innerHTML = formData.raceTime;
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
    document.getElementById('raceDate').value = '';
    document.getElementById('raceLocation').value = '';
    document.getElementById('raceType').value = '';
    document.getElementById('raceTime').value = '';
}

function populateraces(races) {
    races.forEach(race => {
        // var date = new Date(race.raceDate)
        // var year = date.getFullYear();
        // var month = ("0" + (date.getMonth() + 1)).slice(-2);
        // var day = ("0" + date.getDate()).slice(-2);
        // race.raceDate = `${year}-${month}-${day}`

        insertNewRecord(race)
    });
}

// var date = new Date(1304921325178.3193); // Date 2011-05-09T06:08:45.178Z
// var year = date.getFullYear();
// var month = ("0" + (date.getMonth() + 1)).slice(-2);
// var day = ("0" + date.getDate()).slice(-2);