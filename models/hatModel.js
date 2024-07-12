const mongoose = require('mongoose')

//학생당직표
const hatSchema = new mongoose.Schema(
    {
        status: String
    },
    {
        timestamps: true
    }

);


const Hat = mongoose.model('hat', hatSchema);

module.exports = Hat;