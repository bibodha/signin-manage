var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
   res.send('this is a report page');
});


module.exports = router;
