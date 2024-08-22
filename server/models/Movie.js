const mongoose = require('mongoose')
const User = require('./User');

const MovieSchema = new mongoose.Schema(
    {
        title: {type:String},
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    {timestamps: true},
)

module.exports = mongoose.model("Movie" , MovieSchema);