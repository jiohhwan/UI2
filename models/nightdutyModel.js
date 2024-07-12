const mongoose = require('mongoose')

//안전당직표
const nightdutySchema = new mongoose.Schema(
    {
        data: Buffer,
        contentType: String,
        size: Number,//(Byte)
    },
    {
        timestamps: true
    }

);


const Nightduty = mongoose.model('nightduty', nightdutySchema);

module.exports = Nightduty;