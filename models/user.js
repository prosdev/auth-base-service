const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
//Define our model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
});

//onSave hook, encrypt password
//Before saving model, run encypt function
userSchema.pre('save', function(next) {
    const user = this;

    //generate salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) { return next(err); }

        //encrypt password
        bcrypt.hash(user.password, salt, null, function(err, hash) {
           if (err) { return next(err); }

           //override plain-text with encrypted password
           user.password = hash;
           next();
        });
    })
});
//Create the model class
const UserModel = mongoose.model('user', userSchema);

//Export the model
module.exports = UserModel;