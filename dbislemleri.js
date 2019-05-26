const mq = require('mssql');
const dosyasistemi = require('fs');
const moment = require('moment');


var config = {
    user: 'sa',
    password: '123456',
    server: 'DESKTOP-GJMRS8S',
    database: 'Proje',
    encrypt: true ,
    "dialect": "mssql",
    "dialectOptions": {
        "instanceName": "SQLEXPRESS"
        
    }
    
};
module.exports.bireyselReferansgetir = function (req, res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("select * from referanslar where tip = 1 ", function (err, recordset) {
            if (err) console.log(err)
            mq.close();
            res.render('bireyselreferans', { bref: recordset.recordset });
            //res.send(recordset);
        });
    });
}
module.exports.kurumsalReferansgetir = function (req, res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("select * from referanslar where tip = 2 ", function (err, recordset) {
            if (err) console.log(err)
            mq.close();
            res.render('kurumsalreferans', { kref: recordset.recordset });
            //res.send(recordset);
        });
    });
}
module.exports.portföylerimgetir = function (req, res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("select * from portföylerim  ", function (err, recordset) {
            if (err) console.log(err)
            mq.close();
            res.render('portfoylerim', { prtfy: recordset.recordset });
            //res.send(recordset);
        });
    });
}
module.exports.sizdengelenlergetir = function (req, res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("select * from yorumlar where onay = 1  ", function (err, recordset) {
            if (err) console.log(err)
            mq.close();
            res.render('sizdengelenler', { szdngln: recordset.recordset });
            //res.send(recordset);
        });
    });
}
module.exports.yazilargetir = function (req, res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("select * from yazilar where onay = 1  ", function (err, recordset) {
            if (err) console.log(err)
            mq.close();
            res.render('yazilar', { yazi: recordset.recordset });
            //res.send(recordset);
        });
    });
}
module.exports.yorumEklePost = function (req,res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("INSERT INTO yazilar(baslik,metin,tarih,ana,onay,firma,adsoyad,unvan) values ( '"+ req.body.baslik +"', '"+ req.body.metin + "', '"+ req.body.tarih +"' , "+ req.body.onay +",'"+ req.body.firma +"','"+ req.body.adsoyad +"','"+ req.body.unvan +"' )", function (err) { 
            if (err) console.log(err)
            mq.close();
            res.redirect('sizdengelenler');
        });
    });
}