const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const PORT = process.env.PORT || 8080;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'apps-monitoring',
            version: '1.0.0',
            description: 'Documentação completa da api apps-monitoring',
        },
        servers: [
            {
                url: `http://localhost:${PORT}/api`,
            },
        ],
    },
    apis: ['./routers/*.js'],
};

const specs = swaggerJsdoc(options);

const setupSwagger = (app) => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = setupSwagger;
