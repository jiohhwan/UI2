const mongoose = require('mongoose')

//식단표
const foodSchema = new mongoose.Schema(
    {
        data: Buffer,
        contentType: String,
        size: Number,//(Byte)
    },
    {
        timestamps: true
    }

);


const Food = mongoose.model('food', foodSchema);

module.exports = Food;