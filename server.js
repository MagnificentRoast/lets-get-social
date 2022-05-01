// const express = require('express');
// const mongoose = require('mongoose');

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lets-get-social', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

// // use this to log mongo queries being executed!
// mongoose.set('debug', true);

// app.use(require('./controllers'));

// app.listen(PORT, () => console.log(`🌎 ==> API server now on port ${PORT}!`));

// I messed up the server code with the above, below is the correct code.

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;
const correntDB = process.env.currentDB || "lets-get-social";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Mongoose middleware

mongoose.connect("mongodb://localhost/lets-get-social", () => console.log(`Connected to ${currentDB} databasel`));

mongoose.set("debug", true);

app.listen(PORT, () => console.log(`🌎 ==> Connected to localhost:${PORT}!`));