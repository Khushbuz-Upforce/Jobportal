require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const path = require("path");
const fs = require("fs");
const cors = require("cors");

// MongoDB Connection
const ConnectDB = require('./Config/database')
ConnectDB();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true })); // Change `true` or `false` as needed
app.use(bodyParser.json());

// Create uploads/jobs folder if it doesn't exist
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Access controll

const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


// Routes
app.get('/', (req, res) => {
    res.send('Hello');
});

app.use('/', require('./Routes/indexRoute'))


// Start Server
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Server running on port : ${PORT}`);
});
