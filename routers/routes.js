const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retorna uma mensagem simples
 *     responses:
 *       200:
 *         description: Retorna a mensagem 'api-up'
 */
router.get('/', (req, res) => {
    res.json({
        message: 'api-up'
    });
});

module.exports = router;
