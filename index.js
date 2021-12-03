import express from 'express';
import bodyParser from 'body-parser'
import { readFileSync, writeFileSync } from 'fs';
import hbs from 'hbs'


const app = express();
const port = 3000;
const jsonParser = bodyParser.json()
const fileName = 'runs.json';



// Load data from file
let rawData = readFileSync(fileName);
let data = JSON.parse(rawData);
console.log("data:", data)

app.set('views', 'views');
app.set('view engine', 'hbs');
app.use(express.static('public'))

hbs.registerPartials("views/partials"), err => {
    if (err) {
        console.log(err);
    }
}

app.get('/', (request, response) => response.render('home'))

app.get('/runs', (request, response) => {
    console.log('get runs is working just fine...')
    data.sort((a, b) => (a.runDate > b.runDate) ? 1 : -1);
    response.send(data);

});

app.post('/runs', jsonParser, (request, response) => {
    console.log("Iam posting...")
    data.push(request.body);
    writeFileSync(fileName, JSON.stringify(data, null, 2));
    response.end();
});



app.listen(port, () => console.log("I am listening on ", port));