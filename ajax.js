const mq = require("mssql");// veri tabanı bağlantısını mq adlı değişkene atıyoruz
var config = require("./dbconfig");// veri tabanı bağlatı ayarını burayakaydedip sorguda bağlantı açıyoruz

const container = (req, res) => {
    switch (req.body.frm) {
        case 'giris':
            mq.connect(config, function(err) {
                if (err) console.log(err);
                var request = new mq.Request();
                request.query(`select * from uyeler where onay = 1 and email = '${req.body.email}'`, function(err, recordset) {
                    mq.close();
                    if (err) {
                        console.log(err);
                        res.send('~danger~Bir sorun oluştu');
                        return;
                    }

                    let kullanici = recordset.recordset[0];

                    req.session.user = {};
                    let session = req.session.user;
                    session.id = kullanici.id;
                    session.adi = kullanici.adi;
                    session.email = kullanici.email;
                    session.yetki = kullanici.yetki;

                    res.send('~success~Kullanıcı girişi başarılı');
                });
            });
            break;
        case 'cikis':
            if (req.session) {
                // delete session object
                req.session.destroy();
                res.send('destroyed');
            }
            break;

        case 'yorumEkle':
            mq.connect(config, function(err) {
                if (err) console.log(err);
                var request = new mq.Request();
                request.query("INSERT INTO yorumlar(baslik,metin,tarih,onay,firma,adsoyad,unvan) values ( '" + req.body.baslik + "', '" + req.body.metin + "', '" + req.body.tarih + "' , " + req.body.onay + ",'" + req.body.firma + "','" + req.body.adsoyad + "','" + req.body.unvan + "' )", function(err) {
                    if (err) console.log(err);
                    mq.close();
                    res.send('~~~sizdengelenler');
                });
            });
            break;
        case 'yorumOnayla':
            mq.connect(config, function(err) {
                if (err) console.log(err);
                var request = new mq.Request();

                request.query("SELECT * FROM yorumlar WHERE id = " + req.body.id, function(err, recordset) {
                    let yorumo = recordset.recordset[0];

                    let onay = yorumo.onay ? 0 : 1;
                    let yorumupdateQuery = "UPDATE yorumlar SET onay = " + onay + " WHERE id = " + req.body.id;
                    request.query(yorumupdateQuery, function(err) {
                        if (err) console.log(err)
                        mq.close();
                        res.send('~~~asizdengelenler');
                    });
                });
            });
            break;
        case 'yaziEkle':
            mq.connect(config, function(err) {
                if (err) console.log(err);
                var request = new mq.Request();
                request.query("INSERT INTO yazilar(baslik,giris,metin,tarih,onay,yetki) values ( '" + req.body.baslik + "', '" + req.body.giris + "','" + req.body.metin + "', '" + req.body.eklenmeTarihi + "', 1,1)", function(err) {
                    if (err) console.log(err);
                    mq.close();
                    res.send('~~~_yazilar');
                });
            });
            break;
        case 'sliderEkle':
            let imagePathAddSlider = req.file.filename;
            mq.connect(config, function(err) {
                if (err) console.log(err);
                var request = new mq.Request();
                request.query(`INSERT INTO slider(onay,baslik,resim,aciklama) values ( '${req.body.onay}','${req.body.baslik}','${imagePathAddSlider}', '${req.body.aciklama}')`, function(err) {
                    if (err) console.log(err);
                    mq.close();
                    res.send('~success~Başarıyla eklendi.~_slider');
                });
            });
            break;
        case 'sliderGuncelle':
            mq.connect(config, function(err) {
                if (err) console.log(err);
                var request = new mq.Request();

                new Promise((resolve, reject) => {
                    request.query(`UPDATE slider set onay='${req.body.onay ? 1 : 0}',  baslik='${req.body.baslik}', aciklama='${req.body.aciklama}' WHERE id = ${req.body.id}`, function(err) {
                        if (err) {
                            console.log(err);
                            reject(err);
                            return;
                        }
                        resolve();
                    });
                }).then(() => {
                    return new Promise((resolve, reject) => {
                        const imagePathSliderUpdate = req.file.filename;
                        if (imagePathSliderUpdate) {
                            request.query(`UPDATE slider SET resim = '${imagePathSliderUpdate}' WHERE id = ${req.body.id}`, function(err) {
                                if (err) console.log(err);

                                resolve();
                            });
                        } else {
                            resolve();
                        }
                    });
                }).then(() => {
                    res.send('~success~Başarıyla güncelle.~_slider');
                    mq.close();
                })
            });
            break;
        case 'sliderSil':
            mq.connect(config, function(err) {
                if (err) console.log(err);
                var request = new mq.Request();
                request.query("DELETE FROM slider WHERE id = " + req.body.id, function(err) {
                    if (err) console.log(err)
                    mq.close();
                    res.send('~~~_slider');
                });
            });

            break;

        case 'sliderOnayla':
            mq.connect(config, function(err) {
                if (err) console.log(err);
                var request = new mq.Request();

                request.query("SELECT * FROM slider WHERE id = " + req.body.id, function(err, recordset) {
                    let slidero = recordset.recordset[0];

                    let onay = slidero.onay ? 0 : 1;
                    let sliderupdateQuery = "UPDATE slider SET onay = " + onay + " WHERE id = " + req.body.id;
                    request.query(sliderupdateQuery, function(err) {
                        if (err) console.log(err)
                        mq.close();
                        res.send('~~~_slider');
                    });
                });
            });
            break;
        case 'referansEkle':
            let imagePathAdd = req.file.filename;
            mq.connect(config, function(err) {
                if (err) console.log(err);
                var request = new mq.Request();
                request.query(`INSERT INTO referanslar(tip,baslik,resim,aciklama,onay) values ('${req.body.tip}', '${req.body.baslik}','${imagePathAdd}',  '${req.body.aciklama}', 1)`, function(err) {
                    if (err) console.log(err);
                    mq.close();
                    res.send('~success~Başarıyla eklendi.~referanslar');
                });
            });
            break;
        case 'referansOnayla':
            mq.connect(config, function(err) {
                if (err) console.log(err);
                var request = new mq.Request();

                request.query("SELECT * FROM referanslar WHERE id = " + req.body.id, function(err, recordset) {
                    let referanso = recordset.recordset[0];

                    let onay = referanso.onay ? 0 : 1;
                    let referanupdateQuery = "UPDATE referanslar SET onay = " + onay + " WHERE id = " + req.body.id;
                    console.log(referanupdateQuery);
                    request.query(referanupdateQuery, function(err) {
                        if (err) console.log(err)
                        mq.close();
                        res.send('~~~referanslar');
                    });
                });
            });
            break;
        case 'referansGuncelle':
            mq.connect(config, function(err) {
                if (err) console.log(err);
                var request = new mq.Request();

                new Promise((resolve, reject) => {
                    request.query(`UPDATE referanslar set tip='${req.body.tip}',  baslik='${req.body.baslik}', aciklama='${req.body.aciklama}' WHERE id = ${req.body.id}`, function(err) {
                        if (err) {
                            console.log(err);
                            reject(err);
                            return;
                        }
                        resolve();
                    });
                }).then(() => {
                    return new Promise((resolve, reject) => {
                        const refimagePath = req.file.filename;
                        if (refimagePath) {
                            request.query(`UPDATE referanslar SET resim = '${refimagePath}' WHERE id = ${req.body.id}`, function(err) {
                                if (err) console.log(err);

                                resolve();
                            });
                        } else {
                            resolve();
                        }
                    });
                }).then(() => {
                    res.send('~success~Başarıyla eklendi.~referanslar');
                    mq.close();
                })
            });
            break;
        case 'referansSil':
            mq.connect(config, function(err) {
                if (err) console.log(err);
                var request = new mq.Request();
                request.query("DELETE FROM referanslar WHERE id = " + req.body.id, function(err) {
                    if (err) console.log(err)
                    mq.close();
                    res.send('~~~referanslar');
                });
            });

            break;
        case 'uyeOnayla':
            mq.connect(config, function(err) {
                if (err) console.log(err);
                var request = new mq.Request();

                request.query("SELECT * FROM uyeler WHERE id = " + req.body.id, function(err, recordset) {
                    let uye = recordset.recordset[0];

                    let onay = uye.onay ? 0 : 1;
                    let uyeUpdateQuery = "UPDATE uyeler SET onay = " + onay + " WHERE id = " + req.body.id;
                    console.log(uyeUpdateQuery);
                    request.query(uyeUpdateQuery, function(err) {
                        if (err) console.log(err)
                        mq.close();
                        res.send('~~~_uyeler');
                    });
                });
            });
            break;
        case 'uyeGuncelle':
            mq.connect(config, function(err) {
                if (err) console.log(err);
                var request = new mq.Request();
                request.query("UPDATE uyeler SET adi = '" + req.body.adi + "',  email = '" + req.body.email + "' WHERE id = " + req.body.id, function(err) {
                    if (err) console.log(err)
                    mq.close();
                    res.send('~~~_uyeler');
                });
            });
            break;
            case 'yeniUye':
                mq.connect(config, function(err) {
                    if (err) console.log(err);
                    var request = new mq.Request();
                request.query(`INSERT INTO uyeler(adi,resim,email,sifre,yetki) values ('${req.body.adi}','no-image.png',  '${req.body.email}','${req.body.sifre}',3 )`, function(err) {
                        if (err) console.log(err)
                        mq.close();
                        res.send('~success~Talebiniz Alındı Admin Onayı Bekleyiniz.~anasayfa');
                    });
                });
                break;
        case 'uyeSil':
            mq.connect(config, function(err) {
                if (err) console.log(err);
                var request = new mq.Request();
                request.query("DELETE FROM uyeler WHERE id = " + req.body.id, function(err) {
                    if (err) console.log(err)
                    mq.close();
                    res.send('~~~_uyeler');
                });
            });

            break;
        case 'icerikgncl':
            mq.connect(config, function(err) {
                if (err) console.log(err);
                var request = new mq.Request();
                request.query("UPDATE yazilar SET baslik = '" + req.body.baslik + "',  giris = '" + req.body.giris + "', metin = '" + req.body.metin + "', tarih = '" + req.body.tarih + "',  onay = '" + req.body.onay + "' WHERE id = " + req.body.id, function(err) {
                    mq.close();
                    res.send('~~~_yazilar');

                });
            });
            break;
        case 'icerikSil':
            mq.connect(config, function(err) {
                if (err) console.log(err);
                var request = new mq.Request();
                request.query("DELETE FROM yazilar WHERE id = " + req.body.id, function(err) {
                    if (err) console.log(err)
                    mq.close();
                    res.send('~~~_yazilar');


                });
            });

            break;
        case 'yaziOnayla':
            mq.connect(config, function(err) {
                if (err) console.log(err);
                var request = new mq.Request();

                request.query("SELECT * FROM yazilar WHERE id = " + req.body.id, function(err, recordset) {
                    let yazio = recordset.recordset[0];

                    let onay = yazio.onay ? 0 : 1;
                    let yazilarupdateQuery = "UPDATE yazilar SET onay = " + onay + " WHERE id = " + req.body.id;
                    request.query(yazilarupdateQuery, function(err) {
                        if (err) console.log(err)
                        mq.close();
                        res.send('~~~_yazilar');
                    });
                });
            });
            break;
        case 'yorumGuncelle':
            mq.connect(config, function(err) {
                if (err) console.log(err);
                var request = new mq.Request();
                request.query("UPDATE yorumlar SET baslik = '" + req.body.baslik + "',  metin = '" + req.body.metin + "',firma = '" + req.body.firma + "',adsoyad = '" + req.body.adsoyad + "',unvan = '" + req.body.unvan + "' WHERE id = " + req.body.id, function(err) {
                    if (err) console.log(err)
                    mq.close();
                    res.send('~~~asizdengelenler');
                });
            });
            break;
        case 'projeSil':
            mq.connect(config, function(err) {
                if (err) console.log(err);
                var request = new mq.Request();
                request.query("DELETE FROM projeler WHERE id = " + req.body.id, function(err) {
                    if (err) console.log(err)
                    mq.close();
                    res.send('~~~_projeler');

                });
            });

            break;
        case 'yorumSil':
            mq.connect(config, function(err) {
                if (err) console.log(err);
                var request = new mq.Request();
                request.query("DELETE FROM yorumlar WHERE id = " + req.body.id, function(err) {
                    if (err) console.log(err)
                    mq.close();
                    res.send('~~~asizdengelenler');

                });
            });
            break;
        case 'projeEkle':
            let imagePathAddprojekle = req.file.filename;
            mq.connect(config, function(err) {
                if (err) console.log(err);
                var request = new mq.Request();
                request.query(`INSERT INTO projeler(baslik,resim,aciklama,onay) values ('${req.body.baslik}','${imagePathAddprojekle}',  '${req.body.aciklama}', 1)`, function(err) {
                    if (err) console.log(err);
                    mq.close();
                    res.send('~success~Başarıyla eklendi.~_projeler');
                });
            });
            break;
        case 'projeGuncelle':
            mq.connect(config, function(err) {
                if (err) console.log(err);
                var request = new mq.Request();

                new Promise((resolve, reject) => {
                    request.query(`UPDATE projeler set baslik='${req.body.baslik}', aciklama='${req.body.aciklama}', tip='${req.body.tip}' WHERE id = ${req.body.id}`, function(err) {
                        if (err) {
                            console.log(err);
                            reject(err);
                            return;
                        }
                        resolve();
                    });
                }).then(() => {
                    return new Promise((resolve, reject) => {
                        const imagePathProje = req.file.filename;
                        if (imagePathProje) {
                            request.query(`UPDATE projeler SET resim = '${imagePathProje}' WHERE id = ${req.body.id}`, function(err) {
                                if (err) console.log(err);

                                resolve();
                            });
                        } else {
                            resolve();
                        }
                    });
                }).then(() => {
                    res.send('~success~Başarıyla eklendi.~_projeler');
                    mq.close();
                })
            });



        break;
        case 'projeOnayla':
            mq.connect(config, function(err) {
                if (err) console.log(err);
                var request = new mq.Request();

                request.query("SELECT * FROM projeler WHERE id = " + req.body.id, function(err, recordset) {
                    let projeo = recordset.recordset[0];

                    let onay = projeo.onay ? 0 : 1;
                    let projeupdateQuery = "UPDATE projeler SET onay = " + onay + " WHERE id = " + req.body.id;
                    console.log(projeupdateQuery);
                    request.query(projeupdateQuery, function(err) {
                        if (err) console.log(err)
                        mq.close();
                        res.send('~~~_projeler');
                    });
                });
            });
            break;
        case 'portfoyEkle':
            let imagePathAddprtfyekle = req.file.filename;
            mq.connect(config, function(err) {
                if (err) console.log(err);
                var request = new mq.Request();
                request.query(`INSERT INTO portföylerim(baslik,resim,aciklama,adres,onay) values ('${req.body.baslik}','${imagePathAddprtfyekle}',  '${req.body.aciklama}','${req.body.adres}', 1)`, function(err) {
                    if (err) console.log(err);
                    mq.close();
                    res.send('~success~Başarıyla eklendi.~_aportfoylerim');

                });
            });
            break;
        case 'portfoyGuncelle':
            mq.connect(config, function(err) {
                if (err) console.log(err);
                var request = new mq.Request();

                new Promise((resolve, reject) => {
                    request.query(`UPDATE portföylerim set baslik='${req.body.baslik}', aciklama='${req.body.aciklama}', adres='${req.body.adres}' WHERE id = ${req.body.id}`, function(err) {
                        if (err) {
                            console.log(err);
                            reject(err);
                            return;
                        }
                        resolve();
                    });
                }).then(() => {
                    return new Promise((resolve, reject) => {
                        const imagePathPortfoy = req.file.filename;
                        if (imagePathPortfoy) {
                            request.query(`UPDATE portföylerim SET resim = '${imagePathPortfoy}' WHERE id = ${req.body.id}`, function(err) {
                                if (err) console.log(err);

                                resolve();
                            });
                        } else {
                            resolve();
                        }
                    });
                }).then(() => {
                    res.send('~success~Başarıyla eklendi.~_aportfoylerim');
                    mq.close();
                })
            });
            break;
        case 'portfoyOnayla':
            mq.connect(config, function(err) {
                if (err) console.log(err);
                var request = new mq.Request();

                request.query("SELECT * FROM portföylerim WHERE id = " + req.body.id, function(err, recordset) {
                    let portfoyo = recordset.recordset[0];

                    let onay = portfoyo.onay ? 0 : 1;
                    let portfoyupdateQuery = "UPDATE portföylerim SET onay = " + onay + " WHERE id = " + req.body.id;
                    console.log(portfoyupdateQuery);
                    request.query(portfoyupdateQuery, function(err) {
                        if (err) console.log(err)
                        mq.close();
                        res.send('~~~_aportfoylerim');
                    });
                });
            });
            break;

        case 'portfoySil':
            mq.connect(config, function(err) {
                if (err) console.log(err);
                var request = new mq.Request();
                request.query("DELETE FROM portföylerim WHERE id = " + req.body.id, function(err) {
                    if (err) console.log(err)
                    mq.close();
                    res.send('~~~_aportfoylerim');
                });
            });

            break;

    }
};


module.exports = container;