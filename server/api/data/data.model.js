'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DataSchema = new Schema({
    index: Number,
    dateString: String,
    percentChange: Number,
    change: Number,
    isPositive: Boolean,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Data', DataSchema);