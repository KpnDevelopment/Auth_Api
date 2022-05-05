
const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');
const express = require('express');
// const { baseModelName } = require('../models/User');

const verify = require('./verifyToken')

router.post("/register", async (req, res) => {

    // validate the data before we a user

    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    // checking if user is already exist

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email Already Exist')

    // hash password 

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create  a new user

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch (error) {
        res.status(400).send(error)
    }

})

//login

router.post('/login', async (req, res) => {
    // validate the data before we a user

    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    // checking if email  exist

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email  is wrong');
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("invalid password");

    // create and assign a token

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    // res.header('auth-token', token).send(token)
    res.status(200).json({token:token,user:user._id})
})


router.post("/get",verify, async(req, res, next)=>{

try {
    let doc = await User.findOne(req.body).select("name email");
    res.status(200).json({user:doc})
    
} catch (error) {
    res.status(200).json({ error: error})
}

})




module.exports = router;