/**
 * Created by kunee on 07/04/2019.
 */
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = exports.schema = new Schema({
    email: {
        type: String,
        unique: true, // prevents multiple signups with the same email
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    isTeacher: {
        type: Boolean
    },
    picture: {
        type: String
    }

});

userSchema.pre('save', async function(next) {
    const user = this;
    user.password = bcryptjs.hashSync(user.password, 10);
    return next();
});

userSchema.methods.checkPassword = function(password) {

    console.log(bcryptjs.compareSync(password, this.password));
    return bcryptjs.compareSync(password, this.password);
}

exports.model = mongoose.model('User', userSchema);