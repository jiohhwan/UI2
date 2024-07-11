const asyncHandler = require("express-async-handler");

const login = (req, res) => {
    res.render("login");
};

const loginuser = asyncHandler((req, res) => {
    const { username, password } = req.body;

    if(username === "gaon" && password === "123") {

        res.render("admin");
    }else{
        res.send("login failed");
    }
});

module.exports = { login, loginuser };