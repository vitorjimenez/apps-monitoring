const helmet = require('helmet');

const secureHeaders = () => {
    return helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ['\'self\''],
                styleSrc: ['\'self\'', '\'unsafe-inline\''],
                mediaSrc: ['\'self\''],
                frameSrc: ['\'none\''],
            },
        },
        dnsPrefetchControl: false,
        frameguard: {action: 'deny'},
        hidePoweredBy: true,
    });
};

module.exports = secureHeaders;
