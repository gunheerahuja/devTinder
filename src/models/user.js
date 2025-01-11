const mongoose = require('mongoose');
//const { LWOLoader } = require('three/examples/jsm/Addons.js');
const validator = require('validator');

//user schema

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxLength: 20,
        minLength: 2,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 20,
        minLength: 2,
        trim: true,
    },
    age: {
        type: Number,
        min: 18,
        max: 99,
        required: true,
    },
    email: {
        type: String,
        lowerCase: true,
        required: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        select: false,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error('Password should not contain the word password');
            }
        }
    },
    gender: {
        type: String,
         validate(value){
            if(!['male', 'female','others'].includes(value)){
                throw new Error('Gender should be male, female or others');
            }
         },
    },
    photoUrl: {
        type: String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error('Invalid url');
            }
        }
    },
    about: {
        type: String,
        default:"This is a default about of the user!",
    },
    hobbies: [{
        type: String,
        required: true,
        //max 5 hobbies
        validate(value){
            if(value.length > 5){
                throw new Error('Maximum 5 hobbies are allowed');
            }
        },

    }],

},
    { timestamps: true }
);


module.exports =  mongoose.model("User",userSchema);