const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /search/:term:
 *   post:
 *     tags:
 *       - Search
 *     description: Search for a restaurant
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: term
 *         in: query
 *         require: true
 *         type: string
 *         example: 1
 *     responses:
 *       200:
 *          description: OK
 *          content:
 *             application/json:
 *              example:
 *                  [
 *                   {
 *                      message: Success
 *                   }
 *               ]
 *       400:
 *          description: Fail to add 
 *       default:
 *         description: Fail to add
 *     security:
 *       - Secured: []
 */
router.post('/', function(req, res, next) {

    res.status(200).json({ message: "success post to search" });
})

module.exports = router;