const SecurityAlert = require('../models/securityAlert');

// Função para obter todos os alertas de segurança
const getSecurityAlerts = async (req, res) => {
    try {
        const alerts = await SecurityAlert.find();
        res.status(200).json(alerts);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar alertas de segurança', error });
    }
};

const addSecurityAlert = async (req, res) => {
    console.log('Request Body:', req.body); 

    const { description, severity } = req.body;

    if (!description || !severity) {
        return res.status(400).json({ message: 'Descrição e severidade são obrigatórios' });
    }

    try {
        const alert = new SecurityAlert({ description, severity });
        await alert.save();
        res.status(201).json(alert);
    } catch (error) {
        console.error('Erro ao adicionar alerta de segurança:', error);
        res.status(500).json({ message: 'Erro ao adicionar alerta de segurança' });
    }
};



// Remover alerta de segurança
const removeSecurityAlert = async (req, res) => {
    const { id } = req.params;
    try {
        await SecurityAlert.findByIdAndDelete(id);
        res.status(204).send(); 
    } catch (error) {
        res.status(404).json({ message: 'Alerta de segurança não encontrado' });
    }
};

// Atualizar alerta de segurança
const updateSecurityAlert = async (req, res) => {
    const { id } = req.params;
    const { description, severity } = req.body;
    try {
        const updatedAlert = await SecurityAlert.findByIdAndUpdate(id, { description, severity }, { new: true });
        if (!updatedAlert) {
            return res.status(404).json({ message: 'Alerta de segurança não encontrado' });
        }
        res.status(200).json(updatedAlert);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar alerta de segurança', error });
    }
};

module.exports = {
    getSecurityAlerts,
    addSecurityAlert,
    removeSecurityAlert,
    updateSecurityAlert,
};
