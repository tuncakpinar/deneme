const mq = require("mssql");
var config = require("./dbconfig");




module.exports.anasayfa = function (req, res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("select * from slider where onay = 1", function (err, recordset) {
            if (err) console.log(err);
            mq.close();
            res.render("ana", { sliders: recordset.recordset });
           
        });
    });
};

module.exports.bireyselReferansgetir = function (req, res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("select * from referanslar where tip = 1 ", function (err, recordset) {
            if (err) console.log(err);
            mq.close();
            res.render("bireysel-referanslar", { bref: recordset.recordset });
            
        });
    });
};
module.exports.kurumsalReferansgetir = function (req, res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("select * from referanslar where tip = 2 ", function (err, recordset) {
            if (err) console.log(err);
            mq.close();
            res.render("kurumsal-referans", { kref: recordset.recordset });
            
        });
    });
};
module.exports.portfoylerimgetir = function (req, res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("select * from portföylerim  ", function (err, recordset) {
            if (err) console.log(err);
            mq.close();
            res.render("portfoylerim", { prtfy: recordset.recordset });
           
        });
    });
};
module.exports.sizdengelenlergetir = function (req, res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("select * from yorumlar where onay = 1  ", function (err, recordset) {
            if (err) console.log(err);
            mq.close();
            res.render("sizdengelenler", { szdngln: recordset.recordset });
           
        });
    });
};
module.exports.yazilargetir = function (req, res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("select * from yazilar where onay = 1  ", function (err, recordset) {
            if (err) console.log(err);
            mq.close();
            res.render("yazilar", { yazi: recordset.recordset });
           
        });
    });
};
module.exports.dprojelergetir = function (req, res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("select * from projeler where onay = 1 and tip=1 ", function (err, recordset) {
            if (err) console.log(err);
            mq.close();
            res.render("devamednprj", { dprj: recordset.recordset });
           
        });
    });
};
module.exports.tprojelergetir = function (req, res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("select * from projeler where onay = 1 and tip=2 ", function (err, recordset) {
            if (err) console.log(err);
            mq.close();
            res.render("tamamlananprj", { tprj: recordset.recordset });
           
        });
    });
};

module.exports.yorumEklePost = function (req, res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("INSERT INTO yazilar(baslik,metin,tarih,ana,onay,firma,adsoyad,unvan) values ( '" + req.body.baslik + "', '" + req.body.metin + "', '" + req.body.tarih + "' , " + req.body.onay + ",'" + req.body.firma + "','" + req.body.adsoyad + "','" + req.body.unvan + "' )", function (err) {
            if (err) console.log(err);
            mq.close();
            res.redirect("sizdengelenler");
        });
    });
};