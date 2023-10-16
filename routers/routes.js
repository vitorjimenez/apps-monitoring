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
router.get('/diag', (req, res) => {
    res.json({
        message: 'api-up'
    });
});

/**
 * @swagger
 * /error:
 *   get:
 *     summary: Simula um erro para testar o webhook
 *     responses:
 *       500:
 *         description: Simula um erro inesperado
 */
router.get('/error', (req, res, next) => {
    // Simulando um erro
    const simulatedError = new Error('Este é um erro simulado para testar o webhook!');
    next(simulatedError);
});

module.exports = router;
