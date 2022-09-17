const mongoose = require('mongoose');
const {DateTime} = require('luxon');

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
    {
        title: {type: String, required: true, maxLength: 100},
        timeStamp: {type: Date, required: true},
        text: {type: String},
        author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    }
);

MessageSchema.virtual('url').get(function() {
    return `/message/${this._id}`;
});

MessageSchema.virtual('timeStampFormatted').get(function() {
    return DateTime.fromJSDate(this.timeStamp).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model('Message', MessageSchema);
