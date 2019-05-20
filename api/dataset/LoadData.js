/**
 * Created by kunee on 06/05/2019.
 */
const mongoose = require('mongoose');
var unirest = require('unirest');
const fs = require('fs');
const locationGenerator = require('../utils/locationGenerator');

const {model: UserModel} = require('../routes/users/userModel');
const {model: AdModel} = require('../routes/ads/adModel');
const {model: ReviewModel} = require('../routes/reviews/reviewModel');

const uifacesApiUrl = 'https://uifaces.co/api';
const uifacesApiKey = '6165d9f6aff360dc5e90153600e140';

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

const transformData = (uiface, isTeacher) => {
    let User = {};
    User.email = uiface.email;
    User.picture = uiface.photo;
    User.firstName = uiface.name.split(' ')[0];
    User.lastName = uiface.name.split(' ')[1];
    User.isTeacher = isTeacher;
    User.password = User.firstName + User.lastName;

    return User;
}

const buildReview = () => {

}

exports.deleteCollections = () => {


}
exports.loadUsers = () => {

    let users = [];
    let Request = unirest.get(uifacesApiUrl);

    Request.header('X-API-KEY', uifacesApiKey)
        .query('limit=50')
        .end(function (response) {
            users = response.map(uiface => transformData(uiface, false));
        });
}


exports.loadTeachersWithAds = async() => {

    const nbUserDeleted = await UserModel.remove({});
    const nbAdDeleted = await AdModel.remove({});

    let teachers = [], users = [];
    let ads = [];
    let Request = unirest.get(uifacesApiUrl);

    Request.header('X-API-KEY', uifacesApiKey)
        .query('limit=50')
        .end(async(response) => {
            //console.log(response.body);
            teachers = response.body.slice(0, Math.round(response.body.length / 2));
            users = response.body;

            users = users.map((uiface, index) => transformData(uiface, index % 2 === 0)).map(async(user) => {
                const userModel = new UserModel(user);
                const doc = await userModel.save();
                return doc;
            });


            Promise.all(users).then(usersWithId => {
                const rawAds = fs.readFileSync(`${__dirname}/ads.json`);
                const ads = JSON.parse(rawAds);
                const teachers = usersWithId.filter(user => user.isTeacher);

                const rawReviews = fs.readFileSync(`${__dirname}/reviews.json`);
                const reviews = JSON.parse(rawReviews);
                const students = usersWithId.filter(user => !user.isTeacher);

                teachers.forEach(teacher => {
                    for(let i=0; i < getRandomInt(4); i++) {
                        const indexReview = getRandomInt(reviews.length);
                        const review = Object.assign({}, reviews.slice(indexReview,parseInt(indexReview+1)).pop());


                        const student = students[getRandomInt(students.length)];
                        review.comment = review.comment.replace(/\{name\}/gi,teacher.firstName);
                        review.author = student._id;
                        review.teacher = teacher._id;
                        const model = new ReviewModel(review).save();
                    }
                });
                //lng={-79.386}
                //lat={43.706}
                const adsWithUserAndLocation = ads.map((ad, index) => {
                    ad.user = teachers[index]._id;
                    ad.geolocation = locationGenerator.generateRandomPoint(-79.386, 43.706, 5000);
                    return ad;
                }).forEach(adWithUser => {
                    let model = new AdModel(adWithUser);
                    model.save();
                });
            });

        });
}
