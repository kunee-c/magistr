/**
 * Created by kunee on 02/04/2019.
 */

const {model: UserModel} = require('./userModel');

exports.getUsers = async () => {
    return await UserModel.find();
}

exports.getUserByEmail = async (email) => {
    return await UserModel.findOne({email});
}

exports.getUser = async (id) => {
    return await UserModel.findById(id);
}

exports.addUser = async (user) => {
    const newUser = new UserModel(user);
    const doc = await newUser.save();
    return doc;
}

exports.updateUser = (user) => {

}

exports.getTeachers = () => {

}