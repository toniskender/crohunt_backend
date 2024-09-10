const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const calendarSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    huntingArea: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Calendar = mongoose.model('Calendar', calendarSchema);
module.exports = Calendar;
