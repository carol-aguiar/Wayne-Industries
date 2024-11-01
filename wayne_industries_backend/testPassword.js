const axios = require('axios');

// Teste o registro
async function testRegister() {
    try {
        const response = await axios.post('http://localhost:3000/api/auth/register', {
            username: 'usuarioTeste',
            password: 'senhaSegura',
            role: 'funcionario'
        });
        console.log('Registro bem-sucedido:', response.data);
    } catch (error) {
        console.error('Erro ao registrar:', error.response.data);
    }
}

// Teste o login
async function testLogin() {
    try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
            username: 'usuarioTeste',
            password: 'senhaSegura'
        });
        console.log('Login bem-sucedido:', response.data);
    } catch (error) {
        console.error('Erro ao fazer login:', error.response.data);
    }
}

testRegister().then(() => testLogin());
