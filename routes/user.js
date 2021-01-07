const express = require('express');
const router = express.Router();


router.get('/:email', function(req, res, next) {
    res.status(200).json({ message: "success get user email" });
})
router.post('/:email', function(req, res, next) {
    res.status(200).json({ message: "success post user info" });
})
router.patch('/:email', function(req, res, next) {
    res.status(200).json({ message: "success update user info" });
})
router.delete('/:email', function(req, res, next) {
    res.status(200).json({ message: "success delete user info" });
})

module.exports = router;