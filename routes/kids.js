var express = require('express');
var router = express.Router();
var Kid = require('../models/kid');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var data =[];
    Kid.find(function(err, kids){
        if(kids.length !== 0){
            data = kids.map(function(item){
                return item.toJSON();
            });
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

router.post('/', function(req, res, next){
    var item = req.body.kid;
    var kid = new Kid({

    })
});

module.exports = router;
