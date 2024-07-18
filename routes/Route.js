const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { getBoard, getboardAdd, createBoard, selectBoard, getboardUpdate, updateBoard } = require("../controllers/BoardController")
const { login, loginuser } = require("../controllers/loginController")
const { hat, getFood, getDayduty, getNightduty, getCloth, downloadCloth, getAdmin, getaddCloth } = require("../controllers/addController")
const Board = require('../models/BoardModel');
const Food = require('../models/foodModel');
const Dayduty = require('../models/daydutyModel');
const Nightduty = require('../models/nightdutyModel');
const Hat = require('../models/hatModel');

router.get('/', asyncHandler(async(req, res) => {
        const recentFood = await Food.findOne().sort({ createdAt: -1 });//가장 최근의 이미지 가져오기
        let foodSrc = null;
        if (recentFood) {
          const base64 = recentFood.data.toString('base64');
          foodSrc = `data:${recentFood.contentType};base64,${base64}`;
        }
        const recentDayduty = await Dayduty.findOne().sort({ createdAt: -1 });
        let daydutySrc = null;
        if (recentDayduty) {
          const base64 = recentDayduty.data.toString('base64');
          daydutySrc = `data:${recentDayduty.contentType};base64,${base64}`;
        }
        const recentNightduty = await Nightduty.findOne().sort({ createdAt: -1 });
        let nightdutySrc = null;
        if (recentNightduty) {
          const base64 = recentNightduty.data.toString('base64');
          nightdutySrc = `data:${recentNightduty.contentType};base64,${base64}`;
        }

        const boards = await Board.find({}).sort({ createdAt: -1 }).limit(5);

        const hat = await Hat.findOne({});
        
        res.render("mainUI", {boards: boards, foodSrc, daydutySrc, nightdutySrc, hat});
}))


//메인
router.get('/calc', (req, res) => {
        res.render("calc");
})
router.get('/tip', (req, res) => {
        res.render("tip");
})
router.route("/cloth").get(getCloth);

router.route("/download/latest").get(downloadCloth);

router.get('/company', (req, res) => {
        res.render("company");
})
router.get('/team', (req, res) => {
        res.render("team");
})
router.get('/medicine', (req, res) => {
        res.render("medicine");
})



//공지사항
router.route("/board").get(getBoard);

router.route("/board/:createdAt").get(selectBoard);


//navbar
router.get('/info', (req, res) => {
        res.render("info");
})
router.get('/time', (req, res) => {
        res.render("time");
})
router.get('/calendar', (req, res) => {
        res.render("calendar");
})


//관리자
router.route("/login").get(login).post(loginuser);

router.route("/admin").get(getAdmin).post(hat);

router.route("/boardAdd").get(getboardAdd).post(createBoard);

router.route("/boardUpdate").get(getboardUpdate).post(updateBoard);

router.route("/addFood").get(getFood);

router.route("/addDayduty").get(getDayduty);

router.route("/addNightduty").get(getNightduty);

router.route("/addCloth").get(getaddCloth);

module.exports = router;