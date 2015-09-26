var express = require('express');
var router = express.Router();
var Kid = require('../models/kid');
var _ = require('lodash');

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

    var promise = new Promise((resolve, reject) => {
        Kid.find({'firstname': kid.firstname, 'lastname': kid.lastname}, (err, children) => {
            if(err){
                reject();
            }
            if(!children){
                kid.username = kid.firstname + ' ' + kid.lastname;
            }
            else {
                var child = _.last(children);
                var usernameSplit = child.username.split(' ');
                var num;

                if(usernameSplit.length > 2){
                    num = parseInt(usernameSplit[2]);
                    num++;
                }
                else {
                    num = 1;
                }
                kid.username = child.firstname + ' ' + child.lastname + ' ' + num;
            }
            resolve()
        });
    });
    promise.then(() => {
        kid.save(err => {
            if(err){
                console.log(err);
                return;
            }
            res.setHeader('Content-Type', 'application/json');
            res.send(kid);
        });
    })
});

module.exports = router;
