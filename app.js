const express = require('express');
var multer  = require('multer');

const bp = require('body-parser');
const db = require('./dbislemleri')
const app = express();
const port = process.env.PORT || 3000;



app.set('view engine', 'ejs'); 
app.get('/ana', function(req, res) {res.render('ana');});
app.use(bp.urlencoded({ extended: false }))
app.get('/bireyselreferans', db.bireyselReferansgetir);
app.get('/kurumsalreferans', db.kurumsalReferansgetir);
app.get('/iletisim', function(req, res) {res.render('iletisim');});
app.get('/hakkimizda', function(req, res) {res.render('hakkimizda');});
app.get('/portfoylerim', db.portföylerimgetir);
app.get('/sizdengelenler', db.sizdengelenlergetir);
app.get('/yazilar', db.yazilargetir);
app.post('/yorumekle',db.yorumEklePost);
app.get('/yorumekle', function(req, res) {res.render('yorumekle');});


app.listen(port, () => console.log('Example app listening on port:' + port))