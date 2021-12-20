const express = require("express");
const connectDB = require("./startup/db");
const mongoose = require("mongoose");
const user = require("./routes/user")

const app = express();

connectDB();

app.use(cors())
app.use(express.json());
app.use("/api/users", user);

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})