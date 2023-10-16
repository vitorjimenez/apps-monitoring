const axios = require('axios');
const {Readable} = require('stream');
const FormData = require('form-data');

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const createErrorStream = (error) => {
  const stream = new Readable();
  stream.push(error.stack);
  stream.push(null);
  return stream;
};

const sendDiscordNotification = async (error) => {
  const errorLines = error.stack.split('\n').slice(0, 5).join('\n');
  const errorStream = createErrorStream(error);
  const filename = `error-${formatDate(new Date())}.txt`;

  const embed = {
    title: '🚨 Erro Detectado',
    description: 'Um erro inesperado ocorreu na API.',
    color: 0xFF0000,
    timestamp: new Date().toISOString(),
    fields: [
      {name: 'Mensagem de Erro', value: errorLines},
      {name: 'Método HTTP', value: error.method, inline: true},
      {name: 'URL', value: error.url, inline: true},
    ],
    footer: {
      text: 'Apps-Monitoring',
    },
  };

  try {
    const formData = new FormData();
    formData.append('file', errorStream, filename);
    formData.append('payload_json', JSON.stringify({
      content: '🚨 Alerta da API',
      embeds: [embed],
    }));

    await axios.post(WEBHOOK_URL, formData, {
      headers: formData.getHeaders(),
    });
  } catch (err) {
    console.error('Erro ao enviar notificação ao Discord:', err.message);
  }
};

module.exports = {
  sendDiscordNotification,
};
