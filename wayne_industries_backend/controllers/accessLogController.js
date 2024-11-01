const AccessLog = require('../models/accessLog');

// Função para adicionar um log de acesso
const addAccessLog = async (req, res) => {
    console.log('Request Body:', req.body); // Log do corpo da requisição

    const { message, userId } = req.body; 
    if (!message || !userId) {
        return res.status(400).json({ message: 'Mensagem e ID de usuário são obrigatórios' });
    }

    try {
        const log = new AccessLog({ message, userId });
        await log.save();
        res.status(201).json(log);
    } catch (error) {
        console.error('Erro ao adicionar log de acesso:', error);
        res.status(500).json({ message: 'Erro ao adicionar log de acesso' });
    }
};

// Função para obter logs de acesso (opcional)
const getAccessLogs = async (req, res) => {
    try {
        const logs = await AccessLog.find();
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar logs de acesso' });
    }
};

const updateAccessLog = async (req, res) => {
    console.log('Update Request Body:', req.body); 

    const { message, userId } = req.body;

    if (!message || !userId) {
        return res.status(400).json({ message: 'Mensagem e ID de usuário são obrigatórios' });
    }

    try {
        const updatedLog = await AccessLog.findByIdAndUpdate(req.params.id, { message, userId }, { new: true });
        if (!updatedLog) {
            return res.status(404).json({ message: 'Log de acesso não encontrado' });
        }
        res.status(200).json(updatedLog);
    } catch (error) {
        console.error('Erro ao atualizar log de acesso:', error);
        res.status(500).json({ message: 'Erro ao atualizar log de acesso' });
    }
};

// Function to delete an access log
const deleteAccessLog = async (req, res) => {
    try {
        const deletedLog = await AccessLog.findByIdAndDelete(req.params.id);
        if (!deletedLog) {
            return res.status(404).json({ message: 'Log de acesso não encontrado' });
        }
        res.status(204).send(); 
    } catch (error) {
        console.error('Erro ao remover log de acesso:', error);
        res.status(500).json({ message: 'Erro ao remover log de acesso' });
    }
};

// Export functions
module.exports = {
    addAccessLog,
    getAccessLogs,
    updateAccessLog,
    deleteAccessLog,
};