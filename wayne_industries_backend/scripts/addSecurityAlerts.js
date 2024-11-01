require('dotenv').config();
const mongoose = require('mongoose');
const SecurityAlert = require('../models/securityAlert');

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

const addSecurityAlert = async (description, severity) => {
    const alert = new SecurityAlert({ description, severity });
    await alert.save();
};

const main = async () => {
    await connectDB();
    
    try {
        await addSecurityAlert('Alerta: Tentativa de acesso não autorizado', 'high');
        await addSecurityAlert('Alerta: Ataque DDoS detectado', 'medium');
        console.log('Alertas de segurança adicionados com sucesso');
    } catch (error) {
        console.error('Erro ao adicionar alertas de segurança:', error);
    } finally {
        mongoose.connection.close();
    }
};

main();
