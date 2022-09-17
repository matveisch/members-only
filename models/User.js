const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        firstName: {type: String, required: true, maxLength: 100},
        secondName:{type: String, required: true, maxLength: 100},
        email: {type: String, required: true, maxLength: 100},
        password: {type: String, required: true, maxLength: 100},
        membershipStatus: {type: String, maxLength: 100},
        admin: {type: Boolean}
    }
);

UserSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.secondName}`
});

UserSchema.virtual('url').get(function () {
    return `/user/${this._id}`;
})

module.exports = mongoose.model('User', UserSchema);
