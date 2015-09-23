var express = require('express');
var router = express.Router();
var Kid = require('../models/kid');

/* GET users listing. */
router.get('/', (req, res, next) => {
    var data =[];
    Kid.find((err, kids) => {
        if(kids.length !== 0){
            data = kids.map(item => {
                return item.toJSON();
            });
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

router.post('/add', (req, res, next) => {
    var item = req.body;
    var kid = new Kid({
        firstname : item.firstName,
        lastname : item.lastName,
        street : item.street,
        city : item.city,
        state : item.state,
        zip : item.zip,
        dateOfBirth : item.dateOfBirth,
        gender: item.gender,
        school : item.school
    });

    kid.save(err => {
        if(err){
            console.log(err);
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(kid);
    });
});

module.exports = router;
