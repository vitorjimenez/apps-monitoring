const express = require('express');
const cors = require('cors');
const figlet = require('figlet');

const logger = require('./utils/logging');
const secureHeaders = require('./middlewares/helmet');
const routes = require('./routers/routes');
const connectDB = require('./database/connection');
const setupSwagger = require('./utils/docs');
const errorHandler = require('./middlewares/errorhandler');

const app = express();
const PORT = process.env.PORT || 8080;

setupSwagger(app); // Aplicação da configuração do Swagger na app Express

connectDB();

app.use(logger);
app.use(secureHeaders());
app.use(cors());
app.use(express.json());
app.use('/api/v1', routes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(figlet.textSync('ops-monitoring', {horizontalLayout: 'full'}));
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
