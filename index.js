import express, { response } from 'express';
import hbs from 'hbs';
import fs from 'fs';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const jsonParser = bodyParser.json();
const fileName = 'runs.json';



// Load data from file
let rawData = fs.readFileSync(fileName);
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
app.get('/', (req, res) => res.render('home'))

app.get('/runs', (req, res) => {
    data.sort((a, b) => (a.runDate > b.runDate) ? 1 : -1);
    response.send(data);

});
app.post('/runs', jsonParser, (request, response) => {
    data.push(request.body);
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
    response.end();
});



app.listen(port, () => console.log("I am listening on ", port))