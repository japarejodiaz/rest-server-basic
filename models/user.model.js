const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El corre es obligatorio'],
        unique: { unique: true}
    },
    password : {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE','USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})


userSchema.index({ "email": 1}, {unique: true});
userSchema.methods.toJSON = function() {
    const { __v, password, ...user} = this.toObject();
   return user;
}
module.exports = model( 'User', userSchema );