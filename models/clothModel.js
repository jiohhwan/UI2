const mongoose = require('mongoose')

//학생당직표
const clothSchema = new mongoose.Schema(
    {
        filename: String,
        data: Buffer,
        size: Number,
    },
    {
        timestamps: true
    }

);


const Cloth = mongoose.model('cloth', clothSchema);

module.exports = Cloth;