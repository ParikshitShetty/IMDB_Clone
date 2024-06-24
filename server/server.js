const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express()
const port = 3000

// Enable cors
app.use(cors({
  origin:[
    'http://localhost:5173',
    'http://127.0.0.1:5173',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow the methods you need
  credentials:true,
}));

// Enable cookie parser
app.use(cookieParser());
// Parse Json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

// Import singleton
const SQLiteSingleton = require('./sqliteSingleton');

// create an instance
const dbInstance = new SQLiteSingleton('./imdb.db');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Import routes
const user = require('./routes/userRoute');

// define routes
app.use('/user/',user);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})