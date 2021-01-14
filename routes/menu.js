const express = require('express');
const router = express.Router();
const menuModel = require("../models/menu")

router.get('/:id', function(req, res, next) {
    menuModel.aggregate([{
            $match: { name: "test" }
        }, {
            $project: {
                name: 1
            }
        }],
        (err, result) => {
            console.log(err)
            if (err) {
                res.status(500).json({ message: "unable to retrieve data" });
            }

            console.log(result)
            res.status(200).json({ message: "success get restaurant", data: result });
        })
})

// router.post('/:id', function(req, res, next) {

// })
// router.patch('/:id', function(req, res, next) {

// })
// router.delete('/:id', function(req, res, next) {

// })

module.exports = router;