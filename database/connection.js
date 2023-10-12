const mongoose = require('mongoose');
require('dotenv').config();


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            maxPoolSize: '10',
            family: 4,
            socketTimeoutMS: 45000,
            serverSelectionTimeoutMS: 5000,
        })
        console.log("Banco conectado com sucesso");
    } catch (error){
        console.error(`Erro ao conectar com o banco: ${error.message}`);
        process.exit(1);
    }

    process.on('SIGINT', async () => {
        await mongoose.connection.close();
        process.exit(0);
    })
};

module.exports = connectDB