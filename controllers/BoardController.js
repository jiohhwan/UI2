const Board = require('../models/BoardModel');
const asyncHandler = require('express-async-handler');


//공지사항 페이지
const getBoard = asyncHandler(async(req, res) => {
    let page = parseInt(req.query.page) || 1;
    let limit = 10;
    let skip = (page - 1) * limit;

    try {
        const boards = await Board.find({})
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit);
        const totalPosts = await Board.countDocuments();
        const totalPages = Math.ceil(totalPosts / limit);
    
        res.render('board', {
            boards: boards,
          currentPage: page,
          totalPages: totalPages
        });
      } catch (err) {
        res.status(500).send(err);
      }
})

//공지사항 추가 페이지
const getboardAdd = (req, res) => {
    res.render("BoardAdd", { message: null });
};

//공지사항 추가
const createBoard = asyncHandler(async(req, res) => {
    try {
        const board = await Board.create(req.body)
        //res.status(200).json(board);

        res.render('boardAdd', { message: '공지글이 게시되었습니다.' });
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

//공지사항 수정 페이지
const getboardUpdate = (req, res) => {
    res.render("boardUpdate", {message: null});
};

//공지사항 수정
const updateBoard = asyncHandler(async(req, res) => {
    const { title, field, newValue } = req.body;

    let update = {};
    update[field] = newValue;
  
    try {
      await Board.findOneAndUpdate({ title: title }, update);
      res.render('boardUpdate', { message: '요청사항이 수정되었습니다.' });
    } catch (err) {
      res.send('수정 실패: ' + err.message);
    }
});

//공지사항 글 선택
const selectBoard = asyncHandler(async(req, res) => {
        const createdAt = new Date(req.params.createdAt);
        const board = await Board.findOne({ createdAt });
        if (board) {
            res.render('boardDetail', { board });
        } else {
            res.status(404).send('게시글을 찾을 수 없습니다.');
        }
})




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
const getboard = asyncHandler(async(req, res) => {
    try {
        const {_id} = req.params;
        const board = await Board.findById(_id);
        res.status(200).json(board);

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})
// update a board
const updateboard = asyncHandler(async(req, res) => {
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
    getBoard,
    getboardAdd,
    createBoard,
    selectBoard,
    getboardUpdate,
    updateBoard
}