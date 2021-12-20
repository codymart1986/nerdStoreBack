const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res)=>{
    const salt = await bcrypt.genSalt(10)
    const newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, salt),

    });

    try {
        const savedUser = await newUser.save();
        res.status(200).send("Successfully Created User!");
    } catch(err) {
        res.status(500).send("Something went wrong!");
    }
});

router.post("/login", async (req, res)=>{
    try{
        const user = await User.findOne({userName: req.body.userName});
        if(!user) return res.status(400).send("Invalid User Name or Password.");

        const password = await bcrypt.compare(req.body.password, user.password);
        if(!password) return res.status(400).send("Invalid User Name or Password");

        const token = jwt.sign({
            id: user._id, 
            isAdmin: user.isAdmin,
        })
        
        res.status(200).send(user)
    } catch(err) {
        res.status(500).send(`Internal Server Error: ${err}`);
    }
})

module.exports = router;