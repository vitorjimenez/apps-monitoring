const express = require('express');
const cors = require('cors');

const app = express();
const logger = require('./utils/logging');

const PORT = process.env.PORT || 8080;


app.use(logger);
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'api-up'})
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;

