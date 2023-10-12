const { log } = require('console');
const fs = require('fs'); //File system
const morgan = require('morgan'); // Armazenamento
const path = require('path');
const rfs = require('rotating-file-stream'); //Rotating file system ->(Stream de arquivos) Filtro de armazenamento, clean code - sempre por último 

//Criação dos paths
const logDirectory = path.join(__dirname, '..', 'logs');

// Verifica se a pasta de logs existe, caso contrário cria uma 
if (!fs.existsSync(logDirectory)){ 
    fs.mkdirSync(logDirectory);
}

//Checkagem de logs a cada um dia, renomeia a data para o dia em que a checkagem foi realizada
const acessLogStream = rfs.createStream('acess.log', {
    interval: '1d',
    path: logDirectory
});

morgan.format('combined', ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"');

//Exportação do morgan e configuração do morgan
const logger = morgan('combined', {
    stream: acessLogStream
});

module.exports = logger