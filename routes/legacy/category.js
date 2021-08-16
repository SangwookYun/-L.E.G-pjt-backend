const express = require('express');
const router = express.Router();
const categoryModel = require('../models/category')


router.get('/', function(req, res, next) {
    categoryModel.find({},
    
        (err, result) => {
            console.log(err)
            if (err) {
                res.status(500).json({ message: "unable to retrieve data" });
            }

            console.log(result)
            res.status(200).json({ message: "success get All Advertisements!!", data: result });
        })
})


module.exports = router;