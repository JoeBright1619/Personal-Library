const mongoose = require('mongoose');





const bookSchema =new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    comments: [String],
    commentcount:{
        default: 0,
        type: Number
    }
});

const bookModel = mongoose.model('bookModel',bookSchema);

module.exports = bookModel;