var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
app.use(express.static(__dirname + '/public'));

var flightSchedule = [
        {
            "origin": "ORD",
            "destination": "BOS",
            "airline": "American",
            "departure": "06:55",
            "terminal": 2
        },
        {
            "origin": "BOS",
            "destination": "SEA",
            "airline": "United",
            "departure": "13:30",
            "terminal": 5
        },
        {
            "origin": "JFK",
            "destination": "DFW",
            "airline": "Southwest",
            "departure": "20:00",
            "terminal": 12
        }
];

app.get("/flight_schedule", function (req, res) {
    res.jsonp(flightSchedule);
});

app.get("/flight_schedule/:index", function (req, res) {
    var idx = req.params.index;
    res.jsonp(flightSchedule[idx]);
});

app.delete("/flight_schedule/:index", function (req, res) {
    var idx = req.params.index;
    flightSchedule.splice(idx, 1);
    res.jsonp(flightSchedule);
});

app.post("/flight_schedule", function (req, res) {
    var obj = req.body;
    flightSchedule.push(obj);
    res.jsonp(flightSchedule);
});

app.get('/', function (req, res) {
    res.send('hello world');
});

app.listen(port, ip);