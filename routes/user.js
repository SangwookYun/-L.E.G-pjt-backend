const express = require('express');
const router = express.Router();


router.get('/user/:email', function(req, res, next) {
    res.status(200).json({ message: "success get user email" });
})
router.post('/user/:email', function(req, res, next) {
    res.status(200).json({ message: "success post user info" });
})
router.patch('/user/:email', function(req, res, next) {
    res.status(200).json({ message: "success update user info" });
})
router.delete('/user/:email', function(req, res, next) {
    res.status(200).json({ message: "success delete user info" });
})

module.exports = router;