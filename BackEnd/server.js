const express = require('express')
const app = express()
//Change of Port Number = BackEnd Server 
const port = 4000
//Addition of CORS - Cross-Origin-Request-Server
const cors = require('cors');
//Returns Data from the Server to the Client
const bodyParser = require("body-parser");
//Addition of Mongoose 
const mongoose = require('mongoose');
//Addition of Path 
const path = require('path');

//Allows Corss-Origin Requests from Client(Localhost:3000) to Server(Localhost:4000)
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Config to find path to important files
app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, '../build//static')));

//Used for any Request on the Server
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

//Connection to MongoDB server with user and password
const myConnectionString = 'mongodb+srv://admin:653396@cluster0.ejbwb.mongodb.net/myhomelibrary?retryWrites=true&w=majority';
mongoose.connect(myConnectionString, { useNewUrlParser: true });

//Defining Schema 
const Schema = mongoose.Schema;
//Mongoose Schema Field SetUp
var bookSchema = new Schema({
    author: String,
    bookTitle: String,
    synopsis: String,
    genre: String,
    lent: String
});

var BookModel = mongoose.model("book", bookSchema);

//Route to Server Main Page - http://localhost:4000/
app.get('/', (req, res) => {
    res.send('Hello')
})

//Route to API Books - http://localhost:4000/api/books
app.get('/api/books', (req, res) => {

    //Returns the contents of the Movies in Mongo DB Server
    BookModel.find((err, data) => {
        res.status(200).json(data);
    })
})

//http://localhost:4000/api/books/:id (eg: 5fb3b569bf9ca46d6c4c3dd4)
app.get('/api/books/:id', (req, res) => {
    console.log(req.params.id);

    //Search for Documents and Returns it in JSON Format
    BookModel.findById(req.params.id, (err, data) => {
        res.json(data);
    })
})

//http://localhost:4000/api/books/:id - Pulls ID from URL and Updates Record
app.put('/api/books/:id', (req, res) => {
    console.log("Update Book: " + req.params.id);
    console.log(req.body);

    BookModel.findByIdAndUpdate(req.params.id, req.body, { new: true },
        (err, data) => {
            res.send(data);
        })


})

//Adding a Delete Function 
app.delete('/api/books/:id', (req, res) => {
    console.log("Delete Book: " + req.params.id);

    //Finds Record to then Delete
    BookModel.findByIdAndDelete(req.params.id, (err, data) => {
        res.send(data);
    })
})

//Console Log of http://localhost:4000/api/books = Book Details added in http://localhost:3000/library
app.post('/api/books', (req, res) => {
    console.log('Book Added');
    console.log(req.body.bookTitle);
    console.log(req.body.synopsis);
    console.log(req.body.author);
    console.log(req.body.genre);
    console.log(req.body.lent);

    //Created info to be added to Mongo DB Server, Name and Value Pairs
    BookModel.create({
        bookTitle: req.body.bookTitle,
        synopsis: req.body.synopsis,
        author: req.body.author,
        genre: req.body.genre,
        lent: req.body.lent
    })
    res.send('Book Added');
})

//Will return build/index.html on any other request then what is requested above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../build/index.html'));
})

//Server Setup
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})