const Board = require('../models/BoardModel')
const asyncHandler = require('express-async-handler');


//get all boards
const getBoards = asyncHandler(async(req, res) => {
    try {
        const Boards = await Board.find({});
        res.render("mainUI", {Boards: Boards});

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

//get a board
const getBoard = asyncHandler(async(req, res) => {
    try {
        const {_id} = req.params;
        const board = await Board.findById(_id);
        res.status(200).json(board);

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

//create board
const createBoard = asyncHandler(async(req, res) => {
    try {
        const board = await Board.create(req.body)
        //res.status(200).json(board);

        res.render('boardadd', { message: '공지글이 게시되었습니다.' });
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// update a board
const updateBoard = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const board = await Board.findByIdAndUpdate(id, req.body);
        //we cannot find any product in DB
        if(!board){
            return res.status(404).json({message : `cannot find any board with ID ${id}`})
        }
        const updatedBoard = await Board.findById(id);
        res.status(200).json(updatedBoard);

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// delete a board
const deleteBoard = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const board = await Board.findByIdAndDelete(id);
        if(!board){
            res.status(404);
            throw new Error(`cannot find any board with ID ${id}`);
        }
        res.status(200).json(board);

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

module.exports = {
    getBoards,
    getBoard,
    createBoard,
    updateBoard,
    deleteBoard,
}