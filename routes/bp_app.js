var express = require('express');
var mysql = require('mysql');

var MYSQL_USER = 'bpapp';
var MYSQL_PWD = 'conestogahi';

var maxMeasurementsToDisplay = 10;

var dbconn = mysql.createConnection({
    user : MYSQL_USER,
    password : MYSQL_PWD
});

dbconn.query('USE bpdm_dmitry;');

exports.getMeasurements = function (req, res) {
    dbconn.query('SELECT id,systolic,diastolic FROM BPMeasurements ORDER BY time_recorded;',
    function(err,results,fields) {
        if( err ) {
            throw err;
        }

        res.header('Content-Type','text/html');
        res.render('measurements', {
            measurements : results
        });
    });
};

exports.postNewMeasurement = function (req, res) {
    var systolic = req.body['systolic'];
    var diastolic = req.body['diastolic'];

    dbconn.query(
        'INSERT INTO BPMeasurements (systolic,diastolic) VALUES (?,?);',
        [systolic,diastolic], function(err,result,fields) {
        if( err ) {
            throw err;
        }

        // Write URL of new measurement to Location header
        // but redirect back to all measurements:
        var newUrl = '/bp-measurement/' + result.insertId;
        res.header('Location',newUrl);
        res.redirect('/bp-measurements/');
    });
};

exports.getMeasurement = function (req, res) {
    var measurementId = req.params.mid;
    dbconn.query(
    'SELECT id,systolic,diastolic,time_recorded FROM BPMeasurements WHERE id = ? ;',
    [measurementId],function(err,result,fields) {
        if( err ) {
            throw err;
        }

        res.header('Content-Type','text/html');
        res.render('measurement', {
            measurement : result
        });
    });
};


