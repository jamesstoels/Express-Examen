var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
var db;

MongoClient.connect('mongodb://localhost:27017', (err, database) => {
    if (err) return console.log(err);
    db = database.db('exam');
})

/* GET home page. */
router.get('/', (req, res) => {
    var mysort = { naam: 1 };
    db.collection('students').find().sort(mysort).toArray((err, result) => {
        if (err) throw err;
        res.render('studentenlijst.ejs', { students: result });
    })

});
router.get('/add', (req, res) => {
    res.render('add.ejs', {});
})
router.post('/add', (req, res) => {
    db.collection('students').findOne({ naam: req.body.naam }, (err, result1) => {
        if (err) throw err;
        console.log(req.body.naam);
        console.log(result1);
        if (result1 == null) {

            db.collection('students').insertOne(req.body, (err, result) => {
                if (err) throw err;
                res.redirect('/');
            })

        }
        else {
            res.redirect('/');
            console.log("test");
        }

    })
})

module.exports = router;
