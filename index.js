const express = require('express');
const cors = require('cors');
const logger = require('./utils/logging');
const figlet = require('figlet');
const routes = require('./routers/routes');
const connectDB = require('./database/connection')

const app = express();
const PORT = process.env.PORT || 8080;

connectDB()

app.use(logger);
app.use('/api', routes); //Prefixo de todos os endpoints
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'api-up'})
});

app.listen(PORT, () => {
    console.log(figlet.textSync("ops-monitoring",{horizontalLayout: 'full'}));   
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;

