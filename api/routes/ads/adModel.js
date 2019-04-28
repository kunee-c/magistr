/**
 * Created by kunee on 08/04/2019.
 */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const adSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    isFirstLessonFree: {
        type: Boolean,
        required: false
    },
    teachingMode : {
        type: Array,
        required: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

exports.model = mongoose.model('ad', adSchema);