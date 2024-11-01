const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Função de registro
exports.register = async (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }

        // Cria um novo usuário
        const newUser = new User({
            username,
            password,
            role
        });

        await newUser.save();

        res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

// Função de login
exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Credenciais inválidas' });
        }

        // Log para verificar as senhas
        console.log('Senha recebida:', password);
        console.log('Senha do banco de dados (hash):', user.password);

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('Senha válida:', isPasswordValid);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Credenciais inválidas' });
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET || 'secret_key',
            { expiresIn: '1h' }
        );

        res.status(200).json({ token, message: 'Login bem-sucedido' });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};
