const express = require('express');
const router = express.Router();


router.post('/', function(req, res, next) {

    res.status(200).json({ message: "success post to search" });
})

module.exports = router;