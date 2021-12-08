import { fetchRaces } from "./main.js";

var oneHundredRaceDataPoints = []
var twoHundredRaceDataPoints = []




// export async function getRaces() {
//     const options = {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json'
//         }
//     }
//     const response = await fetch(url, options);
//     const races = await response.json();
//     graphData(races)

// }

export function graphData(races) {

    races.forEach(race => {

        if (race['raceType'] == 100) {
            oneHundredRaceDataPoints.push({
                x: race['raceDate'],
                y: race['raceTime']
            })
        } else {
            twoHundredRaceDataPoints.push({
                x: race['raceDate'],
                y: race['raceTime']
            })


        }

    });

    var { chart100, chart200 } = graph()
    chart100.render()
    chart200.render()


}


function graph() {
    var chart100 = new CanvasJS.Chart("chart100", {
        animationEnabled: true,
        theme: "light1",
        title: {
            text: "100M"
        },
        axisY: {
            title: "Time",
            suffix: "sec",
            titleFontSize: 24,
            includeZero: true
        },
        data: [{
            type: "line",
            xValueType: "dateTime",
            // yValueFormatString: "#,### Units",
            dataPoints: oneHundredRaceDataPoints
        }]
    });
    var chart200 = new CanvasJS.Chart('chart200', {
        animationEnabled: true,
        theme: 'light1',
        title: {
            text: '200M'
        },
        axisY: {
            title: 'Time',
            suffix: "sec",
            titleFontSize: 24,
            includeZero: true
        },
        data: [{
            type: 'line',
            xValueType: 'dateTime',
            dataPoints: twoHundredRaceDataPoints
        }]
    })
    return { chart100, chart200 };
}

function findMedian(arr) {
    if (arr.length === 0) return 0;

    var middle = Math.floor(arr.length / 2);
    arr = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? arr[middle] : (arr[middle - 1] + arr[middle]) / 2;


}