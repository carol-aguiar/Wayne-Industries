const Resource = require('../models/Resource'); // Ajuste o caminho conforme necessário

// Criar um novo recurso
const createResource = async (req, res) => {
    const { name, type, status } = req.body;

    const newResource = new Resource({
        name,
        type,
        status
    });

    try {
        await newResource.save();
        res.status(201).json(newResource);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar recurso' });
    }
};

// Obter todos os recursos
const getResources = async (req, res) => {
    try {
        const resources = await Resource.find();
        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar recursos' });
    }
};

// Atualizar um recurso existente
const updateResource = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedResource = await Resource.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedResource) {
            return res.status(404).json({ message: 'Recurso não encontrado' });
        }
        res.status(200).json(updatedResource);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar recurso' });
    }
};

// Deletar um recurso
const deleteResource = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedResource = await Resource.findByIdAndDelete(id);
        if (!deletedResource) {
            return res.status(404).json({ message: 'Recurso não encontrado' });
        }
        res.status(204).send(); 
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir recurso' });
    }
};

module.exports = {
    createResource,
    getResources,
    updateResource,
    deleteResource
};
