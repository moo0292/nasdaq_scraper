'use strict';

var _ = require('lodash');
var Data = require('./data.model');

// Get list of datas
exports.index = function(req, res) {

    Data
    .find()
    .limit(5)
    .sort({date: -1})
    .exec(function(err, datas) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(datas);
    });
};

function handleError(res, err) {
    return res.status(500).send(err);
}