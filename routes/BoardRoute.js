const express = require('express');
const Product = require('../models/BoardModel')
const {getBoards, getBoard, createBoard, updateBoard, deleteBoard} = require('../controllers/BoardController')

const router = express.Router();

// get all boards
router.get('/', getBoards);

// get a board
router.get('/:id', getBoard);

// create a board
router.post('/boardadd', createBoard);

// update a board
router.put('/:id', updateBoard);

// delete a board
router.delete('/:id', deleteBoard);


module.exports = router;