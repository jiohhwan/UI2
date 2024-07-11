const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { login, loginuser } = require("../controllers/loginController")
const Board = require('../models/BoardModel')


router.get('/', asyncHandler(async(req, res) => {
        const boards = await Board.find({});
        res.render("mainUI", {boards: boards});
}))

router.get('/calc', (req, res) => {
        res.render("calc");
})

router.get('/tip', (req, res) => {
        res.render("tipUI");
})

router.get('/option', (req, res) => {
        res.render("option");
})

router.route("/login").get(login).post(loginuser);

router.get('/boardadd', (req, res) => {
        res.render("Boardadd", { message: null });
})


module.exports = router;