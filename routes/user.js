const express = require('express');
const router = express.Router();



/**
 * @swagger
 * /user/:email:
 *   GET:
 *     tags:
 *       - User
 *     description: Get user profile
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
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

module.exports = router;