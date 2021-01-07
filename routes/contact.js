const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /contact/:
 *   post:
 *     tags:
 *       - Contact
 *     description: Process contact form
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
router.post('/contact/', function(req, res, next) {
    res.status(200).json({ message: "success post to contact" });
})

module.exports = router;