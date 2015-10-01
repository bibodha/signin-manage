var express = require('express');
var router = express.Router();
var Kid = require('../models/kid');
var _ = require('lodash');

/* GET users listing. */

var createKidObject = function(item){
    var kid = new Kid({
        firstName : item.firstName,
        lastName : item.lastName,
        street : item.street,
        city : item.city,
        state : item.state,
        zip : item.zip,
        dateOfBirth : item.dateOfBirth,
        gender: item.gender,
        school : item.school
    });
    return kid;
}

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

router.post('/delete', (req, res, next) => {
    var item = req.body;
    var id = item.id;

    Kid.remove({_id: id}, err => {
        if(err){
            console.error("Delete failed");
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(true);
    });
});

router.post('/add', (req, res, next) => {
    var item = req.body;
    var kid = createKidObject(item);
    var promise = new Promise((resolve, reject) => {
        Kid.find({'firstName': kid.firstName, 'lastName': kid.lastName}, (err, children) => {
            if(err){
                reject();
            }
            if(!children.length){
                kid.userName = kid.firstName + ' ' + kid.lastName;
            }
            else {
                var child = _.last(children);
                var userNameSplit = child.userName.split(' ');
                var num;

                if(userNameSplit.length > 2){
                    num = parseInt(userNameSplit[2]);
                    num++;
                }
                else {
                    num = 1;
                }
                kid.userName = child.firstName + ' ' + child.lastName + ' ' + num;
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
