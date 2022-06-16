// Import modules
const express = require("express");
const cors = require("cors");
const morgan = require('morgan');

// Create express app
const app = express();

// Import db and synchronize
const db = require("./models/sequelize");
db.sequelize.sync();

// Add cors middleware with origin 5500
var corsOptions = { origin: "http://127.0.0.1:5500" };
app.use(cors(corsOptions));

// Add morgan
app.use(morgan('tiny'));

// Add body-parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define root GET route
app.get("/", (req, res) => {
    res.json({ message: "Access API on /contracts/" });
});

// Import the routes into express
require("./routes/contract.routes")(app);

// Set port 8080, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON http://localhost:${PORT}`);
});