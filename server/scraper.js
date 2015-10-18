var Data = require('./api/data/data.model.js');
var Constants = require('./constants.js');
var _ = require('lodash');
var Moment = require('moment');
var schedule = require('node-schedule');
var Q = require('q');
var request = require('request');

function scrapeData() {

    //do a post request
    request.post(Constants.NASDAQ_URL, {
            form: {
                index: 'ixic'
            }
        },
        function(err, response, body) {

            if (!err && response.statusCode == 200) {

                var currentData = JSON.parse(body);
                putToDatabase(currentData);
            }
        });
}

function putToDatabase(currentObject) {

    var pChange = ((currentObject.Change / currentObject.Value) * 100)
    var currentDate = Moment().format('YYYY-MM-DD, h:mm:ss a');

    var newValue = new Data({
        index: currentObject.Value,
        change: currentObject.Change,
        percentChange: pChange,
        dateString: currentDate
    });

    newValue.save(function(err, result) {
        if (err) return console.error(err);
    });
}

function scraperRun() {
    var rule = new schedule.RecurrenceRule();

    rule.minute = new schedule.Range(0, 59, 1);

    schedule.scheduleJob(rule, function() {
        scrapeData();
    });
}


module.exports.scrapeData = scrapeData;
module.exports.scraperRun = scraperRun;