const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        firstName: {type: String, required: true, maxLength: 100},
        secondName:{type: String, required: true, maxLength: 100},
        email: {type: String, required: true, maxLength: 100},
        password: {type: String, required: true, maxLength: 100},
        membershipStatus: {type: String, maxLength: 100},
    }
);

UserSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.secondName}`
});

module.exports = mongoose.model('User', UserSchema);
