const express = require('express');
const bp = require('body-parser');
const db = require('./dbislemleri')
const dbAdmin = require('./dbadminislemleri')
const ajax = require('./ajax')
const session = require('express-session')
const app = express();
const port = process.env.PORT || 3000;
const expressLayouts = require('express-ejs-layouts');
const multer  = require('multer')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
})

var upload = multer({ storage:storage, dest: 'uploads/' })//multere yüklenen resim dosyalarını uploads klasörüne atıyor

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout extractScripts', true)
app.set('layout extractStyles', true)
app.use(session({
    secret: 'TWbtd6^F94XrHw{',
    resave: true,
    saveUninitialized: false,
 
}));
app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    next();
});
app.use('/_css', express.static(__dirname + "/_css"));
app.use('/_rsm', express.static(__dirname + "/_rsm"));
app.use('/fonts', express.static(__dirname + "/fonts"));
app.use('/_js', express.static(__dirname + "/_js"));
app.use('/uploads', express.static(__dirname + "/uploads"));
app.get('/', db.anasayfa);
app.get('/anasayfa', db.anasayfa);
app.use(bp.urlencoded({ extended: false }))
app.get('/bireysel-referanslar', db.bireyselReferansgetir);
app.get('/kurumsal-referans', db.kurumsalReferansgetir);
app.get('/iletisim', function(req, res) {res.render('iletisim');});
app.get('/hakkimizda', function(req, res) {res.render('hakkimizda');});
app.get('/portfoylerim', db.portfoylerimgetir);
app.get('/sizdengelenler', db.sizdengelenlergetir);
app.get('/devamednprj', db.dprojelergetir);
app.get('/tamamlananprj', db.tprojelergetir);
app.get('/yazilar', db.yazilargetir);
app.post('/_yorumekle',db.yorumEklePost);
app.post('/ajax', upload.single('resim'), ajax);
app.get('/_yorumekle', function(req, res) {res.render('yorumekle');});
app.get('/referanslar', dbAdmin.referanslar);
app.get('/referansEkle', dbAdmin.referansEkle);
app.get('/_referans-guncelle', dbAdmin.referansGuncelleGet);
app.get('/_slider', dbAdmin.sliderGetir);
app.get('/_slider-ekle', dbAdmin.sliderEkle);
app.get('/_uyeler', dbAdmin.uyelerG);
app.get('/_uyedznl', dbAdmin.uyeGuncelleGet);
app.get('/_yazilar', dbAdmin.yazilarGetir);
app.get('/_yeniyazi', dbAdmin.yeniyaziE);
app.get('/_slider-guncelle', dbAdmin.sliderGuncelleGet);
app.get('/_icerikgncll', dbAdmin.yaziGuncelleGet);
app.get('/asizdengelenler', dbAdmin.asizdengelenlerGetir);
app.get('/_yorum-guncelle', dbAdmin.yorumGuncelleGet);
app.get('/_projeler', dbAdmin.aprojelerGetir);
app.get('/_projeEkle', dbAdmin.projEkle);
app.get('/_projegncl', dbAdmin.projeGuncelleGet);
app.get('/yeniUye', dbAdmin.yeniuye);
app.get('/_aportfoylerim', dbAdmin.aportfoyGetir);
app.get('/_portfoyEkle', dbAdmin.prtfyEkle);
app.get('/_portfoyguncelle', dbAdmin.prtfyGuncelleGet);
app.get('/profilim', dbAdmin.profilimgetir);




app.listen(port, () => console.log('Example app listening on port:' + port))
