import bodyParser from 'body-parser'
import { readFileSync } from 'fs';

// const { now } = require("d3-timer");

// var data_entry = {
//     'when': Date(now),
//     'race': 100,

// }
export function graphData() {
    const jsonParser = bodyParser.json()
    const fileName = '../../runs.json';



    // Load data from file
    let rawData = readFileSync(fileName);
    // console.log(rawData)
    let data = JSON.parse(rawData);
    // console.log("data:", data)
    var runDate = data[0]['runDate']
    console.log(data.length);
    var graphData = []

    data.forEach(run => {
        graphData.push([run['runDate'], run['runTime']])
    });
    return graphData

}

// console.log(graphData);
// // runDate = new Date(runDate)
// // console.log(runDate)
// // console.log(typeof(runDate))
// // console.log(new Date(875404800000).toLocaleDateString())