const {sendDiscordNotification} = require('../services/webhooks');

const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(`Erro ocorrido em ${req.method} ${req.url} : ${err.message}`);
    err.method = req.method;
    err.url = req.url;

    sendDiscordNotification(err);

    res.status(500).send({error: 'Ocorreu um erro inesperado!'});
};

module.exports = errorHandlerMiddleware;
