const express = require("express");
const connectDB = require("./startup/db");
const mongoose = require("mongoose");

const app = express();

connectDB();

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})