const express = require('express')
const router = express.Router()
const User = require('../models/User');
const bcrypt = require('bcrypt')


router.post("/create", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({...req.body, password: hashedPassword});
        res.status(201).send('User registration had success!');
    } catch (error) {
        res.send({...error, message : "ERROR"});
    }
});

router.put("/update", async (req, res) => {
    try {
        const user = await User.updateOne({_id: req.body._id},{...req.body});
        res.json(user)
    } catch (error) {
        res.json(error)
    }
});

router.delete("/delete", async (req, res) => {
    try {
        const user = await User.deleteOne({_id: req.body._id});
        res.json(user)
    } catch (error) {
        res.json(error)
    }
});

router.get("/get", async (req, res) => {
    try {
        const user = await User.findOne({_id: req.body._id});
        res.json(user)
    } catch (error) {
        res.json(error)
    }
});

module.exports = router;