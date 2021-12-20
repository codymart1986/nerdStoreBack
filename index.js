const express = require("express");
const connectDB = require("./startup/db");
const mongoose = require("mongoose");
const users = require("./routes/users");
const auth = require("./routes/auth");

const app = express();

connectDB();

app.use(express.json());
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})