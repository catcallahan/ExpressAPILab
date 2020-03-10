const express = require('express');
let chirpRouter = require('./chirps');


let router = express.Router();

router.use('/chirps', chirpRouter);

module.exports = router;