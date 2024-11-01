require('dotenv').config(); 
const mongoose = require('mongoose');
const AccessLog = require('../models/accessLog'); 

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado ao MongoDB');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        process.exit(1); 
    }
};

const addAccessLog = async (action, userId, message) => {
    try {
        const log = new AccessLog({ action, userId, message });
        await log.save();
        console.log('Log de acesso adicionado com sucesso:', log);
    } catch (error) {
        console.error('Erro ao adicionar logs de acesso:', error);
    }
};

const main = async () => {
    await connectDB(); 
    await addAccessLog('Usuário 1 acessou o sistema', 'user_1', 'Usuário 1 acessou o sistema');
    await addAccessLog('Usuário 2 acessou o painel de controle', 'user_2', 'Usuário 2 acessou o painel de controle');

    mongoose.connection.close();
};

main();
