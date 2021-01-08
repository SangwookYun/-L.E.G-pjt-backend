const express = require('express');
const router = express.Router();
const { json } = require('body-parser');
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
 *       - name: email
 *         in: body
 *         require: true
 *         type: string
 *         example: "test@mail.com"
 *       - name: message
 *         in: body
 *         require: true
 *         type: string
 *         example: "Hi this is the message from contact form"
 *     responses:
 *       200:
 *          description: OK
 *          content:
 *             application/json:
 *              example:
 *                  [
 *                   {
 *                      message: Successful post to contact
 *                   }
 *               ]
 *       400:
 *          description: Unauthorized
 *       default:
 *         description: Fail to process contact form 
 *     security:
 *       - Secured: []
 */
router.post('/', function(req, res, next) {

    res.status(200).json({ body: req.body, message: "success post to contact" });
})

module.exports = router;