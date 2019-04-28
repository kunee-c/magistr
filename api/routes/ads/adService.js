/**
 * Created by kunee on 03/04/2019.
 */
const {model: AdModel} = require('./adModel');

exports.postAd = async (ad) => {
    const newAd = new AdModel(ad);
    return await newAd.save();
}

exports.updateAd = (ad) => {

}

exports.findOne = (id) => {

}

exports.findAll = async () => {
    const ads = await AdModel.find();
    return ads;
}

exports.findByTopicAndLocation = async (topic, city) => {
    const topicRegEx = new RegExp(topic,'i');
    const cityRegEx = new RegExp(city,'i');
    return await AdModel.find({topic : topicRegEx, location: cityRegEx});
}

exports.findByCriteria = async (filters) => {

    for(let filter in filters) {
        filters[filter] = filters[filter].toLowerCase();
    }
    console.log(filters);
    return await AdModel.find(filters);
}