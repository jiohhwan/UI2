const mongoose = require('mongoose')

const imgSchema = new mongoose.Schema(
    {
    filename: String,
    path: String,
    contentType: String,
    size: Number,
    },
    {
        timestamps: true
    }

);


const Img = mongoose.model('img', imgSchema);

module.exports = Img;