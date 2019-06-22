const mq = require("mssql");
var config = require("./dbconfig");

module.exports.uyelerG = function (req, res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("select * from uyeler", function (err, recordset) {
            if (err) console.log(err);
            mq.close();
            res.render("admin/_uyeler", { uye: recordset.recordset });
        });
    });
};
module.exports.uyeGuncelleGet = function (req,res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("select * from uyeler where id = " + req.query.id, function (err, recordset) { 
            if (err) console.log(err)
            mq.close();
            res.render("admin/_uyedznl", { uyed: recordset.recordset[0] });
        });
    });
}

module.exports.referanslar = function (req, res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("select * from referanslar", function (err, recordset) {
            if (err) console.log(err);
            mq.close();
            res.render("admin/referanslar", { areferans: recordset.recordset });
        });
    });
};
module.exports.referansGuncelleGet = function (req,res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("select * from referanslar where id = " + req.query.id, function (err, recordset) { 
            if (err) console.log(err)
            mq.close();
            res.render("admin/_referans-guncelle", { rfrnsg: recordset.recordset[0]/*direk seçtiğimiz satırı vermesi için sıfır yazıyoruz*/ });
        });
    });
};

module.exports.referansEkle = function (req, res) {
    res.render("admin/referansekle", {


    });
};
module.exports.yeniuye = function (req, res) {
    res.render("yeniUye", {


    });
};
module.exports.sliderEkle = function (req, res) {
    res.render("admin/_slider-ekle", {

        
    });
};
module.exports.projEkle = function (req, res) {
    res.render("admin/_projeEkle", {

        
    });
};
module.exports.prtfyEkle = function (req, res) {
    res.render("admin/_portfoyEkle", {

        
    });
};
module.exports.yeniyaziE = function (req, res) {
    res.render("admin/_yeniyazi", {

        
    });
};
module.exports.yorumekleget = function (req, res) {
    res.render("_yorumekle", {

        
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
module.exports.sliderGetir = function (req, res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("select * from slider", function (err, recordset) {
            if (err) console.log(err);
            mq.close();
            res.render("admin/_slider", { slider: recordset.recordset });
        });
    });
};
module.exports.sliderGuncelleGet = function (req,res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("select * from slider where id = " + req.query.id, function (err, recordset) { 
            if (err) console.log(err)
            mq.close();
            res.render("admin/_slider-guncelle", { sldrd: recordset.recordset[0] });
        });
    });
};


module.exports.yazilarGetir = function (req, res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("select * from yazilar", function (err, recordset) {
            if (err) console.log(err);
            mq.close();
            res.render("admin/_yazilar", { yzlr: recordset.recordset });
        });
    });
};
module.exports.asizdengelenlerGetir = function (req, res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("select * from yorumlar", function (err, recordset) {
            if (err) console.log(err);
            mq.close();
            res.render("admin/asizdengelenler", { szdngln: recordset.recordset });
        });
    });
};
module.exports.yorumGuncelleGet = function (req,res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("select * from yorumlar where id = " + req.query.id, function (err, recordset) { 
            if (err) console.log(err)
            mq.close();
            res.render("admin/_yorum-guncelle", { yrmd: recordset.recordset[0] });
        });
    });
};
module.exports.yaziGuncelleGet = function (req,res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("select * from yazilar where id = " + req.query.id, function (err, recordset) { 
            if (err) console.log(err)
            mq.close();
            res.render("admin/_icerikgncll", { yazid: recordset.recordset[0] });
        });
    });
};
module.exports.aprojelerGetir = function (req, res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("select * from projeler", function (err, recordset) {
            if (err) console.log(err);
            mq.close();
            res.render("admin/_projeler", { prjlr: recordset.recordset });
        });
    });
};
module.exports.projeGuncelleGet = function (req,res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("select * from projeler where id = " + req.query.id, function (err, recordset) { 
            if (err) console.log(err)
            mq.close();
            res.render("admin/_projegncl", { prjd: recordset.recordset[0] });
        });
    });
};
module.exports.aportfoyGetir = function (req, res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("select * from portföylerim", function (err, recordset) {
            if (err) console.log(err);
            mq.close();
            res.render("admin/_aportfoylerim", { prtfy: recordset.recordset });
        });
    });
};
module.exports.prtfyGuncelleGet = function (req,res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("select * from portföylerim where id = " + req.query.id, function (err, recordset) { 
            if (err) console.log(err)
            mq.close();
            res.render("admin/_portfoyguncelle", { prtfy: recordset.recordset[0] });
        });
    });
};
module.exports.profilimgetir = function (req,res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("select * from uyeler where id = " + req.query.id, function (err, recordset) { 
            if (err) console.log(err)
            mq.close();
            res.render("profilim", { prflm: recordset.recordset[0] });
        });
    });
};

