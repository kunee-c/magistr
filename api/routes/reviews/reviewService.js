/**
 * Created by kunee on 03/04/2019.
 */
const {model: ReviewModel} = require('./reviewModel');

exports.findByTeacher = async (teacherId) => {
    return await ReviewModel.find({teacher: teacherId});
}

exports.postReview = async (review) => {
    const newAd = new ReviewModel(review);
    return await newAd.save();
}