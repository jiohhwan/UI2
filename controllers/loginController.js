const asyncHandler = require("express-async-handler");
const Hat = require('../models/hatModel');

const login = (req, res) => {
    res.render("login");
};

const loginuser = asyncHandler(async(req, res) => {
    const { username, password } = req.body;

    if(username === "gaon" && password === "123") {
        const hat = await Hat.findOne({});
        res.render("admin", { hat });
    }else{
        res.send("login failed");
    }
});

module.exports = { login, loginuser };