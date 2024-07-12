const mongoose = require('mongoose')

//학생당직표
const daydutySchema = new mongoose.Schema(
    {
        data: Buffer,
        contentType: String,
        size: Number,//(Byte)
    },
    {
        timestamps: true
    }

);


const Dayduty = mongoose.model('dayduty', daydutySchema);

module.exports = Dayduty;