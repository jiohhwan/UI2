const mongoose = require('mongoose')

const boardSchema = mongoose.Schema(
    {
        title : {
            type: String,
            required: [true, "제목을 입력해주세요."]
        },
        sender : {
            type: String,
            required: true,
        },
        receiver : {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
)


const Board = mongoose.model('board', boardSchema);

module.exports = Board;