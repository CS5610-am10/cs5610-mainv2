var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');

var url = require('url');

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var mongoose = require('mongoose');

var userName = process.env.OPENSHIFT_MONGODB_DB_USERNAME || 'admin';
var password = process.env.OPENSHIFT_MONGODB_DB_PASSWORD || 'QAN-zqHCYX2A';
var mongoDBHost = process.env.OPENSHIFT_MONGODB_DB_HOST || 'localhost';
var mongoDBPort = process.env.OPENSHIFT_MONGODB_DB_PORT || '27017';
var uri = 'mongodb://' + userName + ':' + password + '@' + mongoDBHost + ':' + mongoDBPort + '/cs5610';
console.log(uri);
mongoose.connect(uri);

var CourseSchema = new mongoose.Schema({
    code: String,
    name: String,
    professor: String,
    day: String,
    time: String
}, {collection:'course'});

var NoteSchema = new mongoose.Schema({
    name: String,
    text: String
}, { collection: 'note' });

var ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    count: {type: Number, default:0} 
});
var ProductCategorySchema = new mongoose.Schema({
    name: String,
    products: [ProductSchema]
}, {collection: 'product_category'});

var Course = mongoose.model("Course", CourseSchema);
var Note = mongoose.model("Note", NoteSchema);
var ProductCategory = mongoose.model("ProductCategory", ProductCategorySchema)
var Product = mongoose.model("Product", ProductSchema);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
app.use(express.static(__dirname + '/public'));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    next();
})
.options('*', function (req, res, next) {
    res.end();
});

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

app.get('/course', function (req, res) {
    Course.find(function (err, data) {
        res.jsonp(data);
    });
});

app.post('/course', function (req, res) {
    var course = new Course(req.body);
    course.save(function (err, data) {
        Course.find(function (err, data) {
            res.jsonp(data);
        });
    });
});

app.delete('/course/:id', function (req, res) {
    Course.remove({ _id: req.params.id }, function (err, count) {
        Course.find(function (err, data) {
            res.jsonp(data);
        });
    });
});

app.get('/note', function (req, res) {
    Note.find(function (err, data) {
        res.jsonp(data);
    });
});

app.post('/note', function (req, res) {
    var note = new Note(req.body);
    note.save(function (err, data) {
        Note.find(function (err, data) {
            res.jsonp(data);
        });
    });
});

app.delete('/note/:id', function (req, res) {
    Note.remove({ _id: req.params.id }, function (err, count) {
        Note.find(function (err, data) {
            res.jsonp(data);
        });
    });
});

app.put('/note/:id', function (req, res) {
    var note = req.body;
    console.log(note);
    Note.findById(req.params.id, function (err, data) {
        data.name = note.name;
        data.text = note.text;
        data.save(function (err, data) {
            Note.find(function (err, data) {
                res.jsonp(data);
            });
        });
    });
});

app.get('/product_category', function (req, res) {
    ProductCategory.find(function (err, data) {
        res.jsonp(data);
    });
});

app.get('/product_category/:id/product', function (req, res) {
    var parts = url.parse(req.url, true);
    var searchString = parts.query.search;
    if (searchString === 'undefined') {
        searchString = '.*';
    };
    console.log(parts.query.search);
    ProductCategory.findById(req.params.id, function (err, data) {
        filtered = [];
        for (var index = 0; index < data.products.length; index++) {
            var product = data.products[index];
            var match = product.name.search(new RegExp(searchString, "i"));
            if (match > -1) {
                filtered.push(product);
            }
        }
        console.log(filtered);
        res.jsonp(filtered);
    });
});

app.put('/product_category/:id/product/:pid', function (req, res) {
    var product = req.body;
    ProductCategory.findById(req.params.id, function (err, data) {
        var dbProduct = data.products.id(req.params.pid)
        dbProduct.name = product.name;
        dbProduct.price = product.price;
        dbProduct.count = product.count;
        data.save(function (err, data) {
            res.jsonp(data.products.id(req.params.pid));
        })
    });
});

app.delete('/product_category/:id/product/:pid', function (req, res) {
    ProductCategory.findById(req.params.id, function (err, data) {
        data.products.id(req.params.pid).remove();
        data.save(function (err, data) {
            res.jsonp(data.products);
        })
    });
});


app.post('/product_category/:id', function (req, res) {
    var product = req.body;
    ProductCategory.findById(req.params.id, function (err, data) {
        data.products.push(product);
        data.save(function (err, data) {
            res.jsonp(data.products);
        });
    });
});

app.listen(port, ip);