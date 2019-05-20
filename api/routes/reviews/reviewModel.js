/**
 * Created by kunee on 04/05/2019.
 */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    grade: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

exports.model = mongoose.model('review', reviewSchema);