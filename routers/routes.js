const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'api-up'
    });
});

module.exports = router